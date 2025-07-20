import './Home.css';
import { Carrousel } from '../../atomicos/Carrousel/Carrousel';
import { PedidoProductos } from '../../atomicos/PedidoProductos/PedidoProductos';

export function Home() {
	return (
		<>
			<Carrousel img1={"/carrousel3.jpg"} img2={"/carrousel1.jpg"} img3={"/carrousel2.jpg"}></Carrousel>

			<PedidoProductos categoria={"todos"}/>
			<br></br>
			<PedidoProductos categoria={"electronics"}/>
			<br></br>
			<PedidoProductos categoria={"jewelery"}/>

			<br></br>
		</>
	)
}