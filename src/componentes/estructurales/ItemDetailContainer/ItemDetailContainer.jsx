import "./ItemDetailContainer.css";
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { ContextoCart } from "../../../providers/CartProvider";
import { obtenerWhereCasteada } from "../../../utilities/firebase";
import { Spinner } from "../../atomicos/Spinner/Spinner";
import { ItemCount } from "../../atomicos/ItemCount/ItemCount";
import { ContextoAuth } from "../../../providers/AuthProvider";
import { AlertaBasica } from "../../../utilities/Alert";

export function ItemDetailContainer() {
	let param = useParams();
	
	const contextoCarro = useContext(ContextoCart);
	const contextoAuth = useContext(ContextoAuth);

	const [producto, setProducto] = useState({});
	const [cantidad, setCantidad] = useState(1);
	
	const navigate = useNavigate();

	useEffect(() => {
		contextoAuth.setLoading(true);
		
		obtenerWhereCasteada("productos", "id", parseInt(param["any"]))
		.then(data => {
			const indice = contextoCarro.getOne(data[0].id);
			const cantidadReal = indice != null ? contextoCarro.productosDelCarro[indice].cantidad : 1;

			setCantidad(cantidadReal);
			setProducto(data[0]);
		})
		.finally(() => {contextoAuth.setLoading(false);})
	}, []);

	function AgregarAlCarrito() {
		if (contextoAuth.usuarioActual == null) {AlertaBasica("Debes iniciar sesión antes", "Antes de agregar algo al carrito debes iniciar sesión", "error", "Ok");}
		else {
			if (cantidad > producto.stock) {
				AlertaBasica("Supera el stock disponible!", "La cantidad actual que desea encargar del producto excede el stock", "warning", "ok")
			} else {
				contextoCarro.add(producto, cantidad);
				navigate("/");
			}
		}
		
	}

	function Comprar() {
		if (contextoAuth.usuarioActual == null) {AlertaBasica("Debes iniciar sesión antes", "Antes de comprar algo debes iniciar sesión", "error", "Ok");}
		else {
			console.log("correcto...");
		}
	}

	return (
		<>
			{contextoAuth.loading ? <Spinner></Spinner> : null}

			<div className="container my-5 card p-4 detalle-container">
				<div className="row">
					<div className="col-md-5">
						<img src={producto.image} className="img-fluid detalle-img"/>
					</div>
					<div className="col-md-7 d-flex flex-column justify-content-between">
						<div>
							<h1 className="detalle-titulo">{producto.title}</h1>
							<h2 className="detalle-precio">${producto.price}</h2>
							<h5 className="detalle-descripcion">{producto.description}</h5>
						</div>
						{producto.stock > 0 ? (
							<div>							
								<h6 className="detalle-stock">
									Stock: {producto.stock}
								</h6>

								<ItemCount setCantidad={setCantidad} cantidad={cantidad} limiteSuperior={producto.stock}></ItemCount>
								
								<br></br>

								<div className="d-flex gap-3">
									<button onClick={AgregarAlCarrito} className="btn btn-outline-success">Agregar al carrito</button>
									<button onClick={Comprar} className="btn btn-success">Comprar</button>
								</div>
							</div>
						) : "NO HAY STOCK"}
						
					</div>
				</div>
			</div>
		</>
	);
}