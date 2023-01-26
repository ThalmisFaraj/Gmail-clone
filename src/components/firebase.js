import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFUMjIF_xOSiTW7CBUJyo3wol3cR6gu10",
  authDomain: "clone-84f69.firebaseapp.com",
  projectId: "clone-84f69",
  storageBucket: "clone-84f69.appspot.com",
  messagingSenderId: "878690313709",
  appId: "1:878690313709:web:0e19e54945131a3132f3e4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
