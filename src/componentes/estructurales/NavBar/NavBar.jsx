import './NavBar.css';
import { CartWidget } from "../../atomicos/CartWidget/CartWidget";

export function NavBar(arrayProductos) {
	return (
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container d-flex justify-content-center gap-2">
					<img href="#" src="././public/logo.png" className="logo me-3"></img>
					
					<div className="d-flex " id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex alig">
							{/* <li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">Link 1</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Link 2</a>
							</li> */}
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Categorias
								</a>
								<ul className="dropdown-menu">
									{
										
									}
									<li><a className="dropdown-item" href="#">Muebles</a></li>
									<li><a className="dropdown-item" href="#">Ropa</a></li>
									<li><a className="dropdown-item" href="#">Futbol</a></li>
								</ul>
							</li>
							
						</ul>
						
					</div>
					<form className="d-flex barraBusqueda" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Buscar producto"/>
						<button className="btn btn-outline-light" type="submit">Buscar</button>
					</form>
					<CartWidget srcImg="././public/carro.png"></CartWidget>
				</div>
			</nav>
	)
}

