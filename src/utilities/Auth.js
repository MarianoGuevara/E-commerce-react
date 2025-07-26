import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { appInit } from "./firebase";

const auth = getAuth(appInit);

export function estaLogueado() {
	const user = auth.currentUser;
	return new Promise((resolve) => {
		resolve(user); // creo una promesa y la resuelvo con user. Resolver es  darle un valor a la promesa cuando se termine
	}); 
}

export async function crearUsuario(email, password) {
	try {
		const a = await createUserWithEmailAndPassword(auth, email, password);
		return a;
	} catch (error) {
		console.error("Error al crear usuario:", error.message, " ", error.code);
		return null;
	}
	
	// .then((userCredential) => {
	// 	// Signed up 
	// 	const user = userCredential.user;
	// 	return user;
	// })
	// .catch((error) => {
	// 	console.log(error.message);
	// 	return null;
	// });

}

export function iniciarSesion(email, password) {
	signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		// Signed in 
		const user = userCredential.user;
		// ...
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
	});

}

export function cerrarSesion() {
	signOut(auth).then(() => {
	// Sign-out successful.
	}).catch((error) => {
		console.log(error.message);
	});
}