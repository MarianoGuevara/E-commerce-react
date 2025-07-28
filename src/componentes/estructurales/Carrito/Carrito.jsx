import "./Carrito.css";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext, useState, useEffect  } from 'react'
import { ItemCarro } from "../../atomicos/ItemCarro/ItemCarro";
import { AlertaSiNo, AlertaBasica } from "../../../utilities/Alert";
import { updateDocumento, write } from "../../../utilities/basedatos";
import { Spinner } from '../../atomicos/Spinner/Spinner'
import { useNavigate } from "react-router-dom"
import { ContextoAuth } from "../../../providers/AuthProvider";
 import { Timestamp } from "firebase/firestore";

export function Carrito() {
	const contextoCarro = useContext(ContextoCart);
	const contextoAuth = useContext(ContextoAuth);

	console.log(contextoCarro.productosDelCarro);
	console.log(contextoCarro.cantidad);

	const [total, setTotal] = useState(contextoCarro.getPrice());
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setTotal(contextoCarro.getPrice()); 
	}, [contextoCarro.productosDelCarro])

	function listadoStringResumen() {
		let string = contextoCarro.cantidad + " productos: ";
		for (let i=0; i<contextoCarro.productosDelCarro.length; i++) {
			string += ` (${contextoCarro.productosDelCarro[i].producto.title.slice(0, 15) + "..."}   -   
					  cantidad: ${contextoCarro.productosDelCarro[i].cantidad}) `
		}
		return string;
	}

	async function comprar() {
		const r = await AlertaSiNo(`¿Desea completar la compra con total de $${total}?`, listadoStringResumen(), "info", "si", "no")
		
		if (r.isConfirmed) {
			try {
				setLoading(true);

				let itemActual = undefined;
				for (let i=0; i<contextoCarro.productosDelCarro.length; i++) {
					itemActual = contextoCarro.productosDelCarro[i];
					await updateDocumento("productos", "id", itemActual.producto.id, {stock : (itemActual.producto.stock-itemActual.cantidad)})
				}
				
				AlertaBasica("LISTO!", "La compra fue realizada correctamente", "success", "ok");

				await write("ventas", {
					user: contextoAuth.usuarioActual.email,
					carrito : contextoCarro.productosDelCarro,
					total : total,
					fecha : Timestamp.now()
				});

				contextoCarro.empty();
				navigate("/");

			} catch (e) {
				AlertaBasica("ERROR", "Algo salió mal en la compra, no se pudo realizar: "+e.message , "error", "ok");
			}
			finally {setLoading(false); }
		}
	}

	return (
		<>
			{loading ? <Spinner></Spinner> : null}

			{ // otro ternario para mostrar
				contextoCarro.productosDelCarro.length == 0 ? 
					<div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
						<h1>¡El carrito está vacío!</h1>
					</div>
				: 
				(
					<>
						{contextoCarro.productosDelCarro.map((value, i) => (
							<ItemCarro key={i} value={value} />
						))}
						<br></br>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<h3>Total: ${total}</h3>
							<br></br>
							<button onClick={comprar} className="btn btn-success">COMPRAR</button>
						</div>
						<br></br>
					</>
				)}
		</>
	);
}