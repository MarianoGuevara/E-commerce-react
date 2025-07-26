import './NavBar.css';
import { CartWidget } from "../../atomicos/CartWidget/CartWidget";
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { obtenerKeyCasteada } from '../../../utilities/firebase';
import { AlertaBasica } from '../../../utilities/Alert';
import { Spinner } from "../../atomicos/Spinner/Spinner";
import { ContextoAuth } from "../../../providers/AuthProvider"
import { useContext } from 'react';

export function NavBar() {
	const [categorias, setCategorias] = useState([]);

	const contextoAuth = useContext(ContextoAuth);

	useEffect(() => {
		obtenerKeyCasteada("productos", "category")
		.then(data => {
			setCategorias(data);
		});
	}, []);

	function Alerta(e){
		e.preventDefault(); // evita el refresh del formulario
		AlertaBasica("Operación no desarrollada!","La barra de busqueda aún no es funcional, disculpa las molestias","warning","ok");
	}

	async function close() {
		await contextoAuth.cerrarSesion();
	}
	return (
			<>
				{contextoAuth.loading ? <Spinner></Spinner> : null}
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container d-flex justify-content-center gap-2">

						<NavLink to="/"><img src="/logo.png" className="logo me-3"></img></NavLink>
						
						<div className="d-flex " id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex alig">
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Categorias
									</a>
									<ul className="dropdown-menu">
										{
											categorias.map((valor,i) => {
												return (
													<NavLink key={i} to={`/categorias/${valor}`}>	
														<li><p className="dropdown-item" >{valor}</p></li>
													</NavLink>
												)
											})
										}
									</ul>
								</li>
								
							</ul>
							
						</div>
						<form className="d-flex barraBusqueda" role="search">
							<input className="form-control me-2" type="search" placeholder="Search" aria-label="Buscar producto"/>
							<button onClick={Alerta} className="btn btn-outline-light" type="submit">Buscar</button>
						</form>

						{/* / -> le dice al navegador "busca desde el root del proyecto" */}
						<CartWidget className="carr" srcImg="/carro.png" toGo="/carrito" carro={true}></CartWidget>
						
						{contextoAuth.usuarioActual!=null ?  <p onClick={close} className='nav-link x'>{contextoAuth.usuarioActual.email} (cerrar sesion)</p> : <CartWidget srcImg="/login.png" toGo="/login" carro={false}></CartWidget>}
						
					</div>
				</nav>
			</>
	)
}