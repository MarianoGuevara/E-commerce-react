import './Home.css';
import { Carrousel } from '../../atomicos/Carrousel/Carrousel';
import { MuestreoProductos } from '../../atomicos/MuestreoProductos/MuestreoProductos';

export function Home({arrayProductos}) {
	return (
		<>
			<Carrousel img1={"/carrousel3.jpg"} img2={"/carrousel1.jpg"} img3={"/carrousel2.jpg"}></Carrousel>

			<MuestreoProductos arrayProductos={arrayProductos} categoria={"Todos"}/>
			<br></br>
			<MuestreoProductos arrayProductos={arrayProductos} categoria={"electronics"}/>
			<br></br>
			<MuestreoProductos arrayProductos={arrayProductos} categoria={"jewelery"}/>

			<br></br>
		</>
	)
}