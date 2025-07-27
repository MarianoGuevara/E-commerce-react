import { createContext, useState, useEffect  } from "react";

export const ContextoCart = createContext();
const ProviderCart = ContextoCart.Provider;

export function CartProvider({children}) { // children será app
	const localCarro = localStorage.getItem("carrito-productos");
	const localCant = localStorage.getItem("carrito-cantidad");

	// cargo los 2 estados desde el local storage y si no existe, 0 o array vacio
	const [productosCarro, setProductosCarro] = useState(localCarro ? JSON.parse(localCarro) : []); // ternario
	const [cantidad, setCantidad] = useState(localCant ? parseInt(localCant) : 0);

	useEffect(() => {
		localStorage.setItem("carrito-productos", JSON.stringify(productosCarro));
		localStorage.setItem("carrito-cantidad", cantidad.toString());
	}, [productosCarro, cantidad]); // cuando alguno de estos 2 cambia se ejecuta el useEffect


	const elValorDelCarrito = {
        cantidad: cantidad, // cantidad total de productos del carro
		setCantidad: setCantidad,

		// productosDelCarro -> [{},{}...] cada {} == {cantidad: 10, producto: {id,price,etc}}
		productosDelCarro : productosCarro,

		add : AgregarCarrito,
		delete : EliminarDelCarrito,
		getOne : ObtenerUno,
		empty : VaciarCarrito,

		getPrice : ObtenerTotal
	}

	//#region logica

	function VaciarCarrito() {
		localStorage.removeItem("carrito-productos");
		localStorage.removeItem("carrito-cantidad");
		setProductosCarro([]);
		setCantidad(0);
	}

	function AgregarCarrito(producto, cantidadAgregada) {
		let nuevoCarrito = JSON.parse(JSON.stringify(elValorDelCarrito.productosDelCarro)); // deep copy

		let flag = false;
		for (let i=0; i<nuevoCarrito.length; i++) {
			if (nuevoCarrito[i].producto.id == producto.id) {
				nuevoCarrito[i].cantidad = cantidadAgregada;
				flag = true;
				break;
			} 
		}
		if (!flag) {
			let obj = { 
				cantidad : cantidadAgregada,
				producto : producto,
			}
			console.log(obj);
			nuevoCarrito.push(obj);
		}

		setProductosCarro(nuevoCarrito);
		const cant = ObtenerCantidadReal(nuevoCarrito);
		setCantidad(cant);
	}


	function EliminarDelCarrito(id) {
		let indice = ObtenerUno(id);
		let nuevoCarrito = JSON.parse(JSON.stringify(elValorDelCarrito.productosDelCarro)); 
		setCantidad(cantidad - nuevoCarrito[indice].cantidad);
		nuevoCarrito.splice(indice, 1);
		setProductosCarro(nuevoCarrito);

	}

	function ObtenerUno(id) {
		for (let i=0; i<elValorDelCarrito.productosDelCarro.length; i++) {
			if (elValorDelCarrito.productosDelCarro[i].producto.id == id) {return i;}
		}
		return null;
	}

	function ObtenerCantidadReal(carro) {
		let cantidad = 0;
		for (let i=0; i<carro.length; i++) {
			console.log(carro[i].cantidad);
			cantidad += carro[i].cantidad;
		}
		return cantidad;
	}

	function ObtenerTotal() {
		let total = 0;
		let subtotalActual = 0
		for (let i=0; i<elValorDelCarrito.productosDelCarro.length; i++) {
			subtotalActual = elValorDelCarrito.productosDelCarro[i].cantidad * elValorDelCarrito.productosDelCarro[i].producto.price;
			total += subtotalActual;
		}
		return total;
	}

	//#endregion

	return (
		<ProviderCart value={elValorDelCarrito}>
			{/* llamo a children para que muestre app */}
			{children} 
		</ProviderCart>
	)
}
