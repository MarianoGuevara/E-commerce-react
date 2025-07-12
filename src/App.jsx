import './App.css'
import { NavBar } from './componentes/estructurales/NavBar/NavBar'
import { Footer } from './componentes/estructurales/Footer/Footer'
import { useEffect, useState } from 'react'
import { Home } from './componentes/estructurales/Home/Home'
import { Routes, Route } from 'react-router-dom'
import { MuestreoProductos } from './componentes/atomicos/MuestreoProductos/MuestreoProductos'
import { ItemDetailContainer } from './componentes/atomicos/ItemDetailContainer/ItemDetailContainer'

function App() {
	const [arrayProductos, setArrayProductos] = useState([]);
	const [arrayCategorias, setArrayCategorias] = useState([]);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(response => response.json())
			.then(data => {
				setArrayProductos(data);

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
				
				<Routes>
					<Route path='/' element={<Home arrayProductos={arrayProductos}></Home>}></Route>
					<Route path='/categorias/:any' element={<MuestreoProductos arrayProductos={arrayProductos}/>}></Route>
					<Route path='/detalle/:any' element={<ItemDetailContainer></ItemDetailContainer>}></Route>
					<Route path='*'  element={<p>Error 404</p>}></Route>
				</Routes>
				
			</main>
			
			<br></br>
			 
			<Footer></Footer>
		</div>
	);
}

export default App