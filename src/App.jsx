import './App.css'
import { NavBar } from './componentes/estructurales/NavBar/NavBar'
import { Footer } from './componentes/estructurales/Footer/Footer'
import { useEffect, useState } from 'react'
import { Home } from './componentes/estructurales/Home/Home'
import { Routes, Route } from 'react-router-dom'
import { MuestreoProductos } from './componentes/atomicos/MuestreoProductos/MuestreoProductos'
import { ItemDetailContainer } from './componentes/atomicos/ItemDetailContainer/ItemDetailContainer'
import { PedidoProductos } from './componentes/atomicos/PedidoProductos/PedidoProductos'

function App() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<NavBar></NavBar>
			  
			{/* flex-fill -> empuja el footer abajo */}
			<main className="flex-fill">
				
				<Routes>
					<Route path='/' element={<Home></Home>}></Route>
					<Route path='/categorias/:any' element={<PedidoProductos></PedidoProductos>}></Route>
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