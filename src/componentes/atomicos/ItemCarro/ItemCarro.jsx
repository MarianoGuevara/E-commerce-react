import "./ItemCarro.css";
import { useState, useContext} from 'react'
import { ItemListContainer } from "../../atomicos/ItemListContainer/ItemListContainer";
import { ItemCount } from "../../atomicos/ItemCount/ItemCount";
import { ContextoCart } from "../../../providers/CartProvider";

							// recibe un objeto REAL del carrito de compras
export function ItemCarro({value}){ 
	const contextoCarro = useContext(ContextoCart);

	const [cantidadActual, setCantidadActual] = useState(value.cantidad);

	const subTotal = value.cantidad * value.producto.price;

	return (
		<div className="contenedor d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 m-2">
			<ItemListContainer 
				srcImg={value.producto.image} nombre={value.producto.title} 
				precio={value.producto.price} id={value.producto.id}
			></ItemListContainer>

			
			<button className="btn btn-outline-success" onClick={()=> {
				contextoCarro.add(value.producto, cantidadActual);
			}}> ACTUALIZAR CANTIDAD</button>

			<ItemCount setCantidad={setCantidadActual} cantidad={cantidadActual} limiteSuperior={value.producto.stock}></ItemCount>		
			
			<p>Subtotal del producto: <strong>${subTotal}</strong> </p>

			<img src="/trash.png" className="imgTrash" onClick={() => {contextoCarro.delete(value.producto.id)}}></img>
		</div>
	)
}
