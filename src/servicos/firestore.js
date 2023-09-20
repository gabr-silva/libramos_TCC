import { doc, setDoc, collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

/*async function pegarID(uidUsuario){
    try{
        const usuarioCollection =  collection(db, "usuarios");
        const Id = query(usuarioCollection, where("usuarioId", "==", uidUsuario))
        const querySnapshot = await getDocs(Id)
        if(!querySnapshot.empty) {
            const documento = querySnapshot.docs[0];
            const IdDoc = documento.id
            return IdDoc
        }
    }catch(erro){
        console.log(erro);
    }
}*/

export async function CriarModulos(usuario){
    try {
        const uid = usuario.uid //uid do usuario
        const modulosAdicionados = []; //nova lista de modulos que irá ser adicionada

        
        const usuarioDocRef = doc(db, "usuarios", uid) //cria uma referencia ao documento  do banco com base no UID
        const moduloColecaoRef = collection(db, "modulos") //cria uma referencia a coleção de  modulos

        const querySnapshot = await getDocs(moduloColecaoRef); //obtem a lista de todos os modulos e armazena

        //forEach = repete sobre cada modulo da lista o codigo
        querySnapshot.forEach(async (modulo) => {
            const moduloID = modulo.id //armazena o id do modulo

            const moduloDocRef = doc(usuarioDocRef, "modulos", moduloID); //cria mua nova referencia ao documento modulo dentro do documento do usuario
            const moduloDocSnapshot = await getDoc(moduloDocRef);
    
            //exist() verifica se já existe o modulo no documento do usuário, se não existir cria
            if (!moduloDocSnapshot.exists()) {
                // O módulo ainda não foi adicionado, então adicionamos agora
                await setDoc(moduloDocRef, {
                    id: moduloID,
                    aulas_concluida: 0
                });

                modulosAdicionados.push(moduloID) // rastreia quais modulos foram adicionados
            }
          });
    }catch(error){
        console.log(error)
        return "erro"
    }
    ;
}

export async function PegarModulos(usuario) {
    try {
        const usuarioDocRef = doc(db, "usuarios", usuario.uid)
        const subColecaoModulosRef = collection(usuarioDocRef, 'modulos')
        const queryUser = await getDocs(subColecaoModulosRef)
        const userDados = {}
        queryUser.forEach((doc)=> {
            const dados = doc.data()
            userDados[doc.id] = {
                id: doc.id,
                ...dados
            }
        })
        const querySnapshot = await getDocs(collection(db, "modulos"));
        let modulos = []
        querySnapshot.forEach((doc) => {
            let modulo = {id: doc.id, ...doc.data()}
            modulos.push(modulo)

            if (userDados[doc.id]) {
                // Atualize o campo desejado com base nos dados de progresso do usuário
                modulo.aulas_concluida = userDados[doc.id].aulas_concluida;
            }
        });
        return modulos
    }catch(error){
        console.log(error)
        return "erro"
    }
    ;
}