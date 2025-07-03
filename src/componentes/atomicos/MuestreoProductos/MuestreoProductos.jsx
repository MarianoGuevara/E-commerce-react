import './MuestreoProductos.css'
import { ItemListContainer } from "../ItemListContainer/ItemListContainer"

export function MuestreoProductos({arrayProductos, categoria}) {

	
	return (
			<div className='d-flex flex-column contenedor'>
				<p>
					{categoria}
				</p>
				<ul className="list-unstyled d-flex gap-2 listaproductos mb-3">
					{
						arrayProductos.map((value,i)=>{
							return <li key={i}>
								<ItemListContainer srcImg={value.image} nombre={value.title} precio={value.price}></ItemListContainer>	
							</li>
						})
					}
				</ul>
			</div>
			
	)
}