import './App.css'
import { NavBar } from './componentes/estructurales/NavBar/NavBar'
import { Footer } from './componentes/estructurales/Footer/Footer'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuestreoProductos } from './componentes/atomicos/MuestreoProductos/MuestreoProductos'
import { Carrousel } from './componentes/atomicos/Carrousel/Carrousel'
import { Routes, Route } from 'react-router-dom'

function App() {
	const [arrayProductos, setArrayProductos] = useState([]);
	const [arrayCategorias, setArrayCategorias] = useState([]);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => {
				setArrayProductos(data);

				// crearYSetearArray(data, "category").then(retorno => {
				// 	categorias = retorno;
				// })
				let categoriasArray = filtadoPorKey(data, "category");
				categoriasArray = setOfArray(categoriasArray);
				setArrayCategorias(categoriasArray);

				
			});
	}, []);

	//#region ARRAYS LOGICA (para categoria)

	function filtadoPorKey(array, key) {
		let arrayNuevo = []
		for (let i=0; i<array.length; i++) {
			arrayNuevo.push(array[i][key])
		}

		return arrayNuevo;
	}

	function setOfArray(array) {
		let arraySet = [];
		let flag = false;
		for (let i=0; i<array.length; i++) {
			flag = false;
			for (let j=0; j<arraySet.length; j++) {
				if (array[i] == arraySet[j]) {
					flag = true;
					break;
				}
			}
			if (flag == false) { arraySet.push(array[i]); }
		}
		return arraySet;
	}

	//#endregion

	return (
		<div className="d-flex flex-column min-vh-100">
			<NavBar arrayCategorias={arrayCategorias}></NavBar>
			
		
			{/* flex-fill -> empuja el footer abajo */}
			<main className="flex-fill">
				<Carrousel img1={"./public/carrousel3.jpg"} img2={"./public/carrousel1.jpg"} img3={"./public/carrousel2.jpg"}></Carrousel>

				<MuestreoProductos arrayProductos={arrayProductos} categoria={"Todos"}/>
				<br></br>
				<MuestreoProductos arrayProductos={arrayProductos} categoria={"electronics"}/>
				<br></br>
				<MuestreoProductos arrayProductos={arrayProductos} categoria={"jewelery"}/>

				<br></br>

				{/* <Routes>
					<Route path='/' element={<p>puto</p>}></Route>
				</Routes> */}
				
			</main>
			
			<br></br>
			 
			<Footer></Footer>
		</div>
	);
}

export default App