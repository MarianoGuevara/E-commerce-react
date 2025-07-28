import './Home.css';
import { Carrousel } from '../../atomicos/Carrousel/Carrousel';
import { PedidoProductos } from '../../atomicos/PedidoProductos/PedidoProductos';

export function Home() {
	return (
		<>
			<Carrousel img1={"/carrousel3.jpg"} img2={"/carrousel1.jpg"} img3={"/carrousel2.jpg"}></Carrousel>

			<PedidoProductos propCategoria={"todos"}/>
			<br></br>
			<PedidoProductos propCategoria={"electronics"}/>
			<br></br>
			<PedidoProductos propCategoria={"jewelery"}/>

			<br></br>
		</>
	)
}