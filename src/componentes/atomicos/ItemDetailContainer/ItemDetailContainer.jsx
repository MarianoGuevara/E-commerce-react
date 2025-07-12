import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

export function ItemDetailContainer() {
	let param = useParams();
	const [producto, setProducto] = useState({});

	useEffect(() => {
		fetch('https://fakestoreapi.com/products/'+param["any"])
			.then(response => response.json())
			.then(data => {
				
				setProducto(data);
			});
	}, []);
	console.log(producto);
	return (
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
						<p>Cantidad: 1</p>
						<div className="d-flex gap-3">
							<button className="btn btn-outline-success">Agregar al carrito</button>
							<button className="btn btn-success">Comprar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
