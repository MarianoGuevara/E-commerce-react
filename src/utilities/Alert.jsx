import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySweetAlert = withReactContent(Swal)

export function AlertaBasica(titulo, texto, icono, btn){
	return MySweetAlert.fire({
	title: titulo,
	text: texto,
	icon: icono,
	confirmButtonText: btn
	})
}

export function AlertaSiNo(titulo, texto, icono, btnSi, btnNo){
	return MySweetAlert.fire({
	title: titulo,
	text: texto,
	icon: icono,
	confirmButtonText: btnSi,
	denyButtonText : btnNo
	})
}