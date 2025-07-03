import './CartWidget.css'

export function CartWidget({srcImg}) {
	// console.log("JEJE -> ", typeof(toString(srcImg)))

	return (
		<img src={srcImg} className="carro"></img>
	)
}