import "./ItemCount.css";

export function ItemCount({setCantidad, cantidad}) {

	function mas() {
		setCantidad(cantidad + 1);
	}

	function menos() {
		const cant = cantidad - 1;
		if (cant > 0) {
			setCantidad(cant);
		}
	}

	return (
			<div className="d-flex flex-row gap-1 align-items-center cont">
				<p className="txtCant">Cantidad: {cantidad}</p>
				<img onClick={mas} className="masmenos" src="/mas.png"></img>
				<img onClick={menos} className="masmenos" src="/menos.png"></img>
			</div>
	)
}