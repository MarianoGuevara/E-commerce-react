import { createContext, useState  } from "react";

export const ContextoCart = createContext();
const ProviderCart = ContextoCart.Provider;

export function CartProvider({children}) { // children será app
	const [cantidad, setCantidad] = useState(0)
	const [productosCarro, setProductosCarro] = useState([]);

	const elValorDelCarrito = {
        cantidad: cantidad,
		setCantidad: setCantidad,

		// productosCarro -> [{},{}...] cada {} == {id: 1, cantidad: 5, precio: 24}
		productosCarro : productosCarro,
		setProductosCarro : setProductosCarro,

	}

	return (
		<ProviderCart value={elValorDelCarrito}>
			{/* llamo a children para que muestre app */}
			{children} 
		</ProviderCart>
	)
}
