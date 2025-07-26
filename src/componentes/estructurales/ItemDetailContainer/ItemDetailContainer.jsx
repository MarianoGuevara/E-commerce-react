import "./ItemDetailContainer.css";
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext } from 'react'
import { obtenerWhereCasteada } from "../../../utilities/firebase";
import { Spinner } from "../../atomicos/Spinner/Spinner";
import { AlertaBasica } from "../../../utilities/Alert";
import { ItemCount } from "../../atomicos/ItemCount/ItemCount";

export function ItemDetailContainer() {
	let param = useParams();

	const [producto, setProducto] = useState({});
	const [loading, setLoading] = useState(true);
	const [cantidad, setCantidad] = useState(1);

	const contextoCarro = useContext(ContextoCart);
	
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		obtenerWhereCasteada("productos", "id", parseInt(param["any"]))
		.then(data => {
			setProducto(data[0]);
			setLoading(false);
		});
	}, []);

	function AgregarAlCarrito() {
		if (cantidad > producto.stock) {
			AlertaBasica("Supera el stock disponible!", "La cantidad actual que desea encargar del producto excede el stock", "warning", "ok")
		} else {
			// QUITAR STOCK DE LA BBDD
			
			contextoCarro.add(producto, cantidad);

			navigate("/");
		}
	}

	return (
		<>
			{loading ? <Spinner></Spinner> : null}

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
						<div>
							<h6 className="detalle-stock">Stock: {producto.stock}</h6>

							<ItemCount setCantidad={setCantidad} cantidad={cantidad}></ItemCount>
							
							<div className="d-flex gap-3">
								<button onClick={AgregarAlCarrito} className="btn btn-outline-success">Agregar al carrito</button>
								<button className="btn btn-success">Comprar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
		
	);
}