import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function pegarModulos(){
    try {
        const querySnapshot = await getDocs(collection(db, "modulo"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }catch(error){
        console.log(error)
        return "erro"
    }
    ;
}