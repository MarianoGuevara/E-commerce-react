import './Compras.css'
import { useContext, useEffect, useState } from 'react';
import { ContextoAuth } from '../../../providers/AuthProvider';
import { Spinner } from '../../atomicos/Spinner/Spinner';
import { obtenerWhereCasteada } from '../../../utilities/basedatos';
import { ItemListContainer } from '../../atomicos/ItemListContainer/ItemListContainer';

export function Compras() {
	const contextoAuth = useContext(ContextoAuth);

	const [compras, setCompras] = useState([]);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => { 	
		if (contextoAuth.usuarioActual) {
			setLoading(true);
			obtenerWhereCasteada("ventas", "user", contextoAuth.usuarioActual.email)
			.then(data => {
				console.log(data);
				setCompras(data)
			})
			.finally(() => {setLoading(false);})
		}		
	}, [contextoAuth]);

	return (
		<>
  			{loading ? <Spinner /> : null}

  			{compras.map((compra, i) => (
    			<div key={i} className='compra'>
					
					<h6 className='titulo'>Fecha de la compra: ({compra.fecha.toDate().toLocaleDateString()}). Total de la compra: (${compra.total})</h6>

      				<div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        			
						{
						compra.carrito.map((item, j) => (
							<div key={j} className='objeto'>
								<ItemListContainer srcImg={item.producto.image} nombre={item.producto.title} precio={item.producto.price} id={item.producto.id}></ItemListContainer>
								<p className='cantidad'><strong>Cantidad: {item.cantidad}</strong></p>
							</div>
						))}
					</div>
    			</div>
			))}
		</>

	)
}