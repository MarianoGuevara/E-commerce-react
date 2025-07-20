import './CartWidget.css'
import { ContextoCart } from '../../../providers/CartProvider';
import { useContext } from 'react'
import { NavLink } from 'react-router-dom';

export function CartWidget({srcImg}) {
	const contextoCarro = useContext(ContextoCart);

	return (
		<NavLink to="/carrito">
			<div className='d-flex flex-row align-items-center gap-1'>
				<img src={srcImg} className="carro"></img>
				<p className='txt'>{contextoCarro.cantidad}</p>
			</div>
		</NavLink>
		
	)
}