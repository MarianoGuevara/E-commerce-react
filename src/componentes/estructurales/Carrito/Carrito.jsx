import "./Carrito.css";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext, useState, useEffect  } from 'react'
import { ItemCarro } from "../../atomicos/ItemCarro/ItemCarro";
import { AlertaSiNo } from "../../../utilities/Alert";

export function Carrito() {
	const contextoCarro = useContext(ContextoCart);

	console.log(contextoCarro.productosDelCarro);
	console.log(contextoCarro.cantidad);

	const [total, setTotal] = useState(contextoCarro.getPrice());

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

	function comprar() {
		AlertaSiNo(`¿Desea completar la compra con total de $${total}?`, listadoStringResumen(), "info", "si", "no")
		.then((r)=> {
			if (r.isConfirmed) {
				// HACER COMPRA, SACAR STOCKS DE FIREBASE ETC
			}
		})
		.catch((e)=> {console.log(e.message);})
	}

	return (
		<>
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