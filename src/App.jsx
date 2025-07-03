import './App.css'
import { NavBar } from './componentes/estructurales/NavBar/NavBar'
import { Footer } from './componentes/estructurales/Footer/Footer'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuestreoProductos } from './componentes/atomicos/MuestreoProductos/MuestreoProductos'
import { Carrousel } from './componentes/atomicos/Carrousel/Carrousel'
// import { ItemListContainer } from './componentes/atomicos/ItemListContainer/ItemListContainer'

function App() {
	const [arrayProductos, setArrayProductos] = useState([]);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => {
				setArrayProductos(data);
			});
	}, []);

	return (
		<div className="d-flex flex-column min-vh-100">
			<NavBar></NavBar>
			
			<Carrousel img1={"./public/carrousel1.png"} img2={"./public/carrousel1.png"} img3={"./public/carrousel1.png"}></Carrousel>

			{/* flex-fill -> empuja el footer abajo */}
			<main className="flex-fill">
				<MuestreoProductos arrayProductos={arrayProductos} categoria={"Todos"}/>
				
			</main>

			<Footer></Footer>
		</div>
	);
}

export default App