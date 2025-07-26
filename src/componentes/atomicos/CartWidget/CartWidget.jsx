import './CartWidget.css'
import { ContextoCart } from '../../../providers/CartProvider';
import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { ContextoAuth } from "../../../providers/AuthProvider"
import { AlertaBasica } from '../../../utilities/Alert';

export function CartWidget({srcImg, toGo, carro}) {
	const contextoCarro = useContext(ContextoCart);
	const contextoAuth = useContext(ContextoAuth);
	
	const navigate = useNavigate();

	function navegar() {
		if (contextoAuth.usuarioActual == null && carro == true) {
			AlertaBasica("Debes iniciar sesión", "Debes iniciar sesión para acceder al carrito", "warning", "ok");
		} else {
			navigate(toGo);
		}
	}

	return (
		<div onClick={navegar} className='d-flex flex-row align-items-center gap-1 icono'>
			<img src={srcImg} className="carro"></img>
			{carro ? <p className='txt'>{contextoCarro.cantidad}</p> : null}	
		</div>
		
	)
}