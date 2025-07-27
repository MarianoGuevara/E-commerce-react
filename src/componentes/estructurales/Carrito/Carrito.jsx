import "./Carrito.css";
import { ContextoCart } from "../../../providers/CartProvider";
import { useContext, useState, useEffect  } from 'react'
import { ItemListContainer } from "../../atomicos/ItemListContainer/ItemListContainer";
import { ItemCount } from "../../atomicos/ItemCount/ItemCount";
import { AlertaSiNo } from "../../../utilities/Alert";
import { ItemCarro } from "../../atomicos/ItemCarro/ItemCarro";

export function Carrito() {
	const contextoCarro = useContext(ContextoCart);

	const [total, setTotal] = useState(contextoCarro.getPrice());

	useEffect(() => {
		setTotal(contextoCarro.getPrice()); 
	}, [contextoCarro.productosDelCarro])

	return (
		<>
		{
			contextoCarro.productosDelCarro.map((value,i)=>{
				return (
					<ItemCarro key={i} value={value}></ItemCarro>
				)
			})
		}
		<p>{total}</p>
		</>
	);
}