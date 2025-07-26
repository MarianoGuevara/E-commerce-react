import { createContext, useState, useEffect } from "react";
import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { appInit } from "../utilities/firebase";

export const ContextoAuth = createContext();
const ProviderAuth = ContextoAuth.Provider;

export function AuthProvider({ children }) {
	const auth = getAuth(appInit);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
			setUser(usuarioFirebase);
			setLoading(false);
		});
		return unsubscribe; // limpieza del listener
	}, [auth]); // siempre se va a ejecutar este useEffect cuando cambie auth

	async function crearUsuario(email, password) {
		setLoading(true);
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			return res;
		} catch (error) {
			console.error("Error al crear usuario:", error.message, error.code);
			return null;
		} finally {
			setLoading(false);
		}
	}

	async function iniciarSesion(email, password) {
		setLoading(true);
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			return res;
		} catch (error) {
			console.error("Error al iniciar sesión:", error.message, error.code);
			return null;
		} finally {
			setLoading(false);
		}
	}

	async function cerrarSesion() {
		setLoading(true);
		try {
			await signOut(auth);
			return true;
		} catch (error) {
			console.error("Error al cerrar sesión:", error.message);
			return false;
		} finally {
			setLoading(false);
		}
	}

	const variableAuth = {
		usuarioActual: user, // usuario o null
		
		loading : loading, // para spinner
		setLoading : setLoading,
		
		crearUsuario : crearUsuario,
		iniciarSesion : iniciarSesion,
		cerrarSesion : cerrarSesion,
	};

	return (
		<ProviderAuth value={variableAuth}>
			{children}
		</ProviderAuth>
	)
}
