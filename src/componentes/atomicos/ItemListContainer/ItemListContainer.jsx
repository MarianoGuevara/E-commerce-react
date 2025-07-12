import './ItemListContainer.css';
import { NavLink } from 'react-router-dom';

export function ItemListContainer({ srcImg, nombre, precio, id }) {
	
	let limite = 20;
	let nameCasted = "";
	if (nombre.length > limite) {
		for (let i=0; i<limite; i++) {
			nameCasted += nombre[i];
		}
		nameCasted += "...";
	} else{
		nameCasted = nombre;
	}

	return (
		<NavLink to={`/detalle/${id}`}>
			<div className="card-producto card d-flex flex-column align-items-center gap-1 text-center">
				<div className="contenedorImg">
					<img src={srcImg} className="card-img-top" alt="Producto" />
				</div>
				<div className="card-body p-2">
					<p className="card-text nombre-producto">{nameCasted}</p>
					<p className="card-title precio-producto">$ {precio}</p>
				</div>
			</div>
		</NavLink>
		
	);
}
