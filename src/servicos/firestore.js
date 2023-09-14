import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export async function pegarModulos(){
    try {
        const querySnapshot = await getDocs(collection(db, "modulos"));
        let modulos = []
        querySnapshot.forEach((doc) => {
            let modulo = {id: doc.id, ...doc.data()}
            modulos.push(modulo)
        });
        return modulos
    }catch(error){
        console.log(error)
        return "erro"
    }
    ;
}