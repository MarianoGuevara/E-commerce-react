import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, doc, setDoc, addDoc, query, where } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCFgwpK0D6Ct6MIaJVwQJsBCn5cosNnBs4",
  authDomain: "buyany-c4d95.firebaseapp.com",
  projectId: "buyany-c4d95",
  storageBucket: "buyany-c4d95.firebasestorage.app",
  messagingSenderId: "666100342038",
  appId: "1:666100342038:web:ceae66fa85513b4bb94437"
};

const app = initializeApp(firebaseConfig);
const bd = getFirestore(app);


//#region genericas

export async function getAll(coleccion) {
	const ref = collection(bd, coleccion);
	const q = query(ref); // where("state", "==", "CA") -> 2do parametro de query
	const queryEjecutada = await getDocs(q);
	return queryEjecutada.docs;
}

export async function getSome(coleccion, where) {
	const ref = collection(bd, coleccion);
	const q = query(ref, where); 
	const queryEjecutada = await getDocs(q);
	return queryEjecutada.docs;
}

//#endregion

//#region casteador y funciones reales app

function castearFirebaseObj(firebaseDoc) {
	let arrayNuevo = [];
	firebaseDoc.forEach((d) => {
		arrayNuevo.push(d.data());			
	});
	return arrayNuevo;
}

export async function obtenerTodosCasteada(coleccion) {
	const queryEjecutada = await getAll(coleccion);
	return castearFirebaseObj(queryEjecutada);
}

export async function obtenerWhereCasteada(coleccion, key, value) {
	const queryEjecutada = await getSome(coleccion, where(key, "==", value));
	return castearFirebaseObj(queryEjecutada);
}

//#endregion


// export	async function importarProductos() {
// 		try {
// 			const response = await fetch("https://fakestoreapi.com/products");
// 			const productos = await response.json();

// 			for (const producto of productos) {
// 			await addDoc(collection(bd, "productos"), producto);
// 			}

// 			console.log("Productos importados correctamente con campos originales.");
// 		} catch (error) {
// 			console.error("Error al importar productos:", error);
// 		}
// 		}
	
// await importarProductos();