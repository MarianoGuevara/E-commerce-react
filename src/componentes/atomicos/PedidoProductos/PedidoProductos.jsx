import { MuestreoProductos } from "../MuestreoProductos/MuestreoProductos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerTodosCasteada, obtenerWhereCasteada } from "../../../utilities/basedatos";
import { Spinner } from "../Spinner/Spinner";

export function PedidoProductos({ propCategoria }) {
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
				setteo(r,categoria,false);
			})
		} else {
			obtenerWhereCasteada("productos", "category", categoria)
			.then(r => {
				setteo(r,categoria,false);
			})
		}
		
	}, [categoria]); // array de dependencia. Solo se ejecuta si cambia categoria

	function setteo(r,categoria,bool) {
		setProductos(r);
		setCategoriaActual(categoria);
		setLoading(bool);
	}

	return (
		<>
		{loading ? <Spinner></Spinner> : null}

		<MuestreoProductos arrayProductos={productos} categoria={categoriaActual}></MuestreoProductos>
		</>
	
	);
}