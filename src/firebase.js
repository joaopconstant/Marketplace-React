import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import the storage module

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALrNk6ifRNLI0T_f-qe65yfuTOS5eqRmU",
  authDomain: "techhub-179ed.firebaseapp.com",
  projectId: "techhub-179ed",
  storageBucket: "techhub-179ed.appspot.com",
  messagingSenderId: "148467156014",
  appId: "1:148467156014:web:1e34849e359bbde1dccbbf"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços do Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
