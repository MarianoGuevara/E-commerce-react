import "./Carrito.css";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext } from 'react'

export function Carrito({}) {
	const contextoCarro = useContext(ContextoCart);
	const copiaCarrito = JSON.parse(JSON.stringify(contextoCarro.productosDelCarro));
	console.log(copiaCarrito);
	
	return (
		<>
		{
			copiaCarrito.map((value,i)=>{
				return (
					<div key={i}>
						<p>{value.id}</p>
						<p>{value.cantidad}</p>
						<p>{value.precio}</p>
						<p>--------------------------------------------------</p>
					</div>
				)
			})
		}
		</>
		
	);
}