import './App.css'
import { NavBar } from './componentes/estructurales/NavBar/NavBar'
import { Footer } from './componentes/estructurales/Footer/Footer' 
import { Home } from './componentes/estructurales/Home/Home'
import { Routes, Route } from 'react-router-dom'
import { ItemDetailContainer } from './componentes/estructurales/ItemDetailContainer/ItemDetailContainer'
import { PedidoProductos } from './componentes/atomicos/PedidoProductos/PedidoProductos'
import { Carrito } from './componentes/estructurales/Carrito/Carrito'
import { FormSesion } from './componentes/estructurales/FormSesion/FormSesion'
import { Compras } from './componentes/estructurales/Compras/Compras'

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
					<Route path='/carrito'  element={<Carrito></Carrito>}></Route>
					<Route path='/login'  element={<FormSesion accion="login"></FormSesion>}></Route>
					<Route path='/registro'  element={<FormSesion accion="registro"></FormSesion>}></Route>
					<Route path='/miscompras'  element={<Compras></Compras>}></Route>
					
					<Route path='*'  element={<p>Error 404</p>}></Route>
					
				</Routes>
				
			</main>
			 
			<Footer></Footer>
		</div>
	);
}

export default App