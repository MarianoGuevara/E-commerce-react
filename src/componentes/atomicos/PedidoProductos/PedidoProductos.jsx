import { MuestreoProductos } from "../MuestreoProductos/MuestreoProductos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function PedidoProductos({ categoria: propCategoria }) {
	const paramCategoria  = useParams(); 
	const categoria = propCategoria || paramCategoria["any"]; // categoria tendra valor segun cual de las 2 tenga valor

	const [productos, setProductos] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState("");

	useEffect(() => {
		let url = "https://fakestoreapi.com/products";
		if (categoria !== "todos") {
			url += "/category/" + categoria;
		}

		fetch(url)
			.then(response => response.json())
			.then(data => {
				setProductos(data);
				setCategoriaActual(categoria);
			});
	}, [categoria]); 

	return <MuestreoProductos arrayProductos={productos} categoria={categoriaActual}></MuestreoProductos>;
}