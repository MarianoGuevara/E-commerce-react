import { createContext, useState  } from "react";

export const ContextoCart = createContext();
const ProviderCart = ContextoCart.Provider;

export function CartProvider({children}) { // children será app
	const [cantidad, setCantidad] = useState(0)
	const [productosCarro, setProductosCarro] = useState([]);

	const elValorDelCarrito = {
        cantidad: cantidad, // cantidad total de productos
		setCantidad: setCantidad,

		// productosDelCarro -> [{},{}...] cada {} == {id: 1, cantidad: 5, precio: 24}
		productosDelCarro : productosCarro,

		add : AgregarCarrito, // agregar productos y cantidad del mismo
	}

	//#region logica

	function AgregarCarrito(producto, cantidadAgregada) {
		console.log("PRODUCTO: ", producto);
		console.log("CANTID: ", cantidadAgregada);
		let nuevoCarrito = JSON.parse(JSON.stringify(elValorDelCarrito.productosDelCarro)); // deep copy

		let flag = false;
		for (let i=0; i<nuevoCarrito.length; i++) {
			if (nuevoCarrito[i].id == producto.id) {
				nuevoCarrito[i].cantidad += cantidadAgregada;
				flag = true;
				break;
			} 
		}
		if (!flag) {
			let obj = { 
				id : producto.id,
				cantidad : cantidadAgregada,
				precio : producto.price
			}
			nuevoCarrito.push(obj);
		}

		setProductosCarro(nuevoCarrito)
		setCantidad(elValorDelCarrito.cantidad + cantidadAgregada);
	}

	//#endregion

	return (
		<ProviderCart value={elValorDelCarrito}>
			{/* llamo a children para que muestre app */}
			{children} 
		</ProviderCart>
	)
}
