import "./FormSesion.css";
import { AlertaBasica } from "../../../utilities/Alert";
import { ContextoAuth } from "../../../providers/AuthProvider";
import { NavLink } from "react-router-dom";
import { Spinner } from "../../atomicos/Spinner/Spinner";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"

export function FormSesion({ accion }) {
	const contextoAuth = useContext(ContextoAuth);

	const navigate = useNavigate();

	async function loguarse(email, pass) {
		const a = await contextoAuth.iniciarSesion(email, pass);
		if (a != null) {
			AlertaBasica("Sesión iniciada correctamente!", `Bienvenido, ${email}`, 'success', "Ok")
			.then(() => { navigate("/"); })
		} else {
			AlertaBasica("No se ha podido iniciar sesión", `Revise las credenciales`, 'error', "Ok")
		}
	}

	async function registrarse(email, pass) {
		const res = await contextoAuth.crearUsuario(email, pass)
		if (res != null) {
			AlertaBasica("Usuario creado correctamente!", `El usuario con el mail:  ${email} para loguearte ve a iniciar sesión`, 'success', "Ok")
			.then(() => { contextoAuth.cerrarSesion().then(() => { navigate("/"); }) })
		} else {
			AlertaBasica("No se ha podido crear el usuario!", `El usuario con el mail:  ${email}`, 'error', "Ok")
		}
	}

	async function botonComplete() {
		const email = document.getElementById("email");
		const password = document.getElementById("password");

		if (accion == "login") { 
			await loguarse(email.value, password.value);
		} else {
			await registrarse(email.value, password.value);
		}
	}

	return (
		<>	
			{contextoAuth.loading ? <Spinner></Spinner> : null}
			<div className="login-contenedor m-3 d-flex align-items-center justify-content-center">
				<div className="login-form p-4 m-5 rounded">

					<h2 className="text-center mb-4 text-white">
						{accion == "login" ? "Iniciar sesión" :  "Registrarse"}


					</h2>
					
					<form>
						<div className="mb-3">
							<label htmlFor="email" className="form-label text-white">Correo electrónico</label>
							<input type="email" className="form-control" id="email" name="email" required />
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="form-label text-white">Contraseña</label>
							<input type="password" className="form-control" id="password" name="password" required />
						</div>


						<NavLink to={accion == "login" ? "/registro" : "/login"}>
							<p className="linkRegis">
								{accion == "login" ? "¿No tenés cuenta? REGISTRATE ACA" : "¿Ya tenés cuenta? INICIÁ SESIÓN ACA"}
							</p>
						</NavLink>

						<button type="button" onClick={botonComplete} className="btn btn-success w-100">
							{accion == "login" ? "Iniciar sesion" : "Registrarse"}
						</button>
					</form>
					
				</div>
			</div>
		</>
	);
}