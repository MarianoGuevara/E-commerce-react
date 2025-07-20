import "./ItemDetailContainer.css";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext } from 'react'

export function ItemDetailContainer() {
	let param = useParams();
	const [producto, setProducto] = useState({});

	const contextoCarro = useContext(ContextoCart);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products/'+ param["any"])
			.then(response => response.json())
			.then(data => {
				setProducto(data);
			});
	}, []);

	function AgregarCarrito() {
		console.log("PRODUCTO: ", producto);
		let nuevoCarrito = JSON.parse(JSON.stringify(contextoCarro.productosCarro)); // deep copy

		let flag = false;
		for (let i=0; i<nuevoCarrito.length; i++) {
			if (nuevoCarrito[i].id == producto.id) {
				nuevoCarrito[i].cantidad += 1;
				flag = true;
				break;
			} 
		}
		if (!flag) {
			let obj = { 
				id : producto.id,
				cantidad : 1,
				precio : producto.price
			}
			nuevoCarrito.push(obj);
		}
		contextoCarro.setProductosCarro(nuevoCarrito);
		contextoCarro.setCantidad(contextoCarro.cantidad + 1);

		console.log("id: ", producto.id);
		console.log(contextoCarro);
	}

	function AgregarProductoReal() {
		
	}

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
							<button onClick={AgregarCarrito} className="btn btn-outline-success">Agregar al carrito</button>
							<button className="btn btn-success">Comprar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}