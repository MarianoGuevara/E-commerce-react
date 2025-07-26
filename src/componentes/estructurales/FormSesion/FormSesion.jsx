import "./FormSesion.css";
import { AlertaBasica } from "../../../utilities/Alert";
import {estaLogueado, crearUsuario} from '../../../utilities/Auth'
import { NavLink } from "react-router-dom";
import { Spinner } from "../../atomicos/Spinner/Spinner";
import { useState } from "react";

export function FormSesion({ accion }) {
	const [loading, setLoading] = useState(false);

	async function iniciarSesion(e) {
		const a = await estaLogueado();
	}

	async function registrarse(email, pass) {
		console.log(email);
		console.log(pass);
		const res = await crearUsuario(email, pass)
		console.log(res);
	}

	async function botonComplete() {
		setLoading(true);
		const email = document.getElementById("email");
		const password = document.getElementById("password");

		if (accion == "login") { 
			await iniciarSesion(email.value, password.value);
		} else {
			await registrarse(email.value, password.value);
		}
		setLoading(false);
	}

	return (
		<>	
			{loading ? <Spinner></Spinner> : null}
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