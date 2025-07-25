import { MuestreoProductos } from "../MuestreoProductos/MuestreoProductos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerTodosCasteada, obtenerWhereCasteada } from "../../../firebase";

export function PedidoProductos({ categoria: propCategoria }) {
	const paramCategoria  = useParams(); 
	const categoria = propCategoria || paramCategoria["any"]; // categoria tendra valor segun cual de las 2 tenga valor

	const [productos, setProductos] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState("");

	useEffect(() => {
		if (categoria == "todos") {
			obtenerTodosCasteada("productos")
			.then(r => {
				console.log("ACA");
				setProductos(r);
				setCategoriaActual(categoria);
			})
		} else {
			obtenerWhereCasteada("productos", "category", categoria)
			.then(r => {
				console.log("ACA");
				setProductos(r);
				setCategoriaActual(categoria);
			})
		}
		
	}); 

	return <MuestreoProductos arrayProductos={productos} categoria={categoriaActual}></MuestreoProductos>;
}