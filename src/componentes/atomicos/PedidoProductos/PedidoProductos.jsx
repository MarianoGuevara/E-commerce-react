import { MuestreoProductos } from "../MuestreoProductos/MuestreoProductos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerTodosCasteada, obtenerWhereCasteada } from "../../../firebase";
import { Spinner } from "../Spinner/Spinner";

export function PedidoProductos({ categoria: propCategoria }) {
	const paramCategoria  = useParams(); 
	const categoria = propCategoria || paramCategoria["any"]; // categoria tendra valor segun cual de las 2 tenga valor

	const [productos, setProductos] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		if (categoria == "todos") {
			obtenerTodosCasteada("productos")
			.then(r => {
				console.log("ACA");
				setProductos(r);
				setCategoriaActual(categoria);
				setLoading(false);
			})
		} else {
			obtenerWhereCasteada("productos", "category", categoria)
			.then(r => {
				console.log("ACA");
				setProductos(r);
				setCategoriaActual(categoria);
				setLoading(false);
			})
		}
		
	}, [categoria]); // array de dependencia. Solo se ejecuta si cambia algun item del array

	return (
		<>
		{loading ? <Spinner></Spinner> : null}

		<MuestreoProductos arrayProductos={productos} categoria={categoriaActual}></MuestreoProductos>
		</>
	
	);
}