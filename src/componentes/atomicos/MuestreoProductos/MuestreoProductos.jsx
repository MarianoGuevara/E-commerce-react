import './MuestreoProductos.css'
import { ItemListContainer } from "../ItemListContainer/ItemListContainer"
import { useParams } from "react-router-dom"

export function MuestreoProductos({arrayProductos, categoria}) {
	if (categoria == undefined) {
		const resultado = useParams()
		categoria = resultado["any"];
	}
	
	return (
			<div className='d-flex flex-column contenedor'>
				<p>
					{categoria}
				</p>
				<ul className="list-unstyled d-flex gap-2 listaproductos mb-3">
					{
						arrayProductos.map((value,i)=>{
							if (categoria == arrayProductos[i]["category"] || categoria == "Todos"){
								return <li key={i}>
									<ItemListContainer srcImg={value.image} nombre={value.title} precio={value.price}></ItemListContainer>	
								</li>
							}
							
						})
					}
				</ul>
			</div>
			
	)
}