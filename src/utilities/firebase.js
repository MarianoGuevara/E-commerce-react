import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFgwpK0D6Ct6MIaJVwQJsBCn5cosNnBs4",
  authDomain: "buyany-c4d95.firebaseapp.com",
  projectId: "buyany-c4d95",
  storageBucket: "buyany-c4d95.firebasestorage.app",
  messagingSenderId: "666100342038",
  appId: "1:666100342038:web:ceae66fa85513b4bb94437"
};

export const appInit = initializeApp(firebaseConfig);
