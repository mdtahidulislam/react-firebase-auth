import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.firebase";

const initAuthentication = () => {
    initializeApp(firebaseConfig);
}
export default initAuthentication;