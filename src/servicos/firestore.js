import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase";
import { sub } from "date-fns";

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

export async function PegarDados(usuario) {
    const usuarioRef = doc(db, "usuarios", usuario.uid);
  
    try {
      // Verifique se o documento existe
      const usuarioQuery = await getDoc(usuarioRef);
      
      if (usuarioQuery.exists()) {
        // Obter os dados do documento
        const dadosUsuario = usuarioQuery.data();
        return dadosUsuario;
      } else {
        throw new Error('Documento de usuário não encontrado');
      }
    } catch (error) {
      throw error;
    }
}

export async function CriarModulos(usuario){
    try {
        const uid = usuario.uid //uid do usuario
        const modulosAdicionados = []; //nova lista de modulos que irá ser adicionada
        
        const usuarioDocRef = doc(db, "usuarios", uid) //cria uma referencia ao documento  do banco com base no UID
        const moduloColecaoRef = collection(db, "modulos") //cria uma referencia a coleção de  modulos

        const querySnapshot = await getDocs(moduloColecaoRef);

        const batch = writeBatch(db);
            for (const modulo of querySnapshot.docs) {
            const moduloID = modulo.id;
            const moduloDocRef = doc(usuarioDocRef, "modulos", moduloID);
            const moduloDocSnapshot = await getDoc(moduloDocRef);

            if (!moduloDocSnapshot.exists()) {
                batch.set(moduloDocRef, {
                    aulas_concluida: 0
                });

                modulosAdicionados.push(moduloID);
            }
            }
            await batch.commit();
    }catch(error){
        console.log(error)
        return "erro"
    }
    ;
}

export async function PegarModulos(usuario) {
    try {
        const usuarioDocRef = doc(db, "usuarios", usuario.uid) //cria uma referencia dos dados a partir do uid do usuario
        const subColecaoModulosRef = collection(usuarioDocRef, 'modulos') //dentro da referencia do usuario, pega a coleção modulos
        const queryUser = await getDocs(subColecaoModulosRef) //pega todos os documentos da referencia dos modulos
        const userDados = {} //guardara todos os dados
        queryUser.forEach((doc)=> {
            const dados = doc.data()
            userDados[doc.id] = {
                id: doc.id,
                ...dados
            }
        })
        const modulosQuery = query(collection(db, "modulos"), orderBy('aula', 'asc')) // ordena os modulos, a partir do campo aula dentro de cada documento
        const querySnapshotSorted = await getDocs(modulosQuery);
        
        let modulos = [] //guardara a lista de modulos ordenada
        querySnapshotSorted.forEach((doc) => {
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

//função para pegar a frequencia do usuario
export async function PegarFrequencia(usuario, tipo, modulo_id){
    const usuarioDocRef = doc(db, "usuarios", usuario.uid)
    try { 
        const usuariodados = await getDoc(usuarioDocRef);
        let frequenciaBanco = (usuariodados.data()) ? (usuariodados.data()).frequencia : 0;

        switch (tipo) {
            case 1:
                const frequencia = await VerificarFrequencia(usuario, frequenciaBanco);
                return frequencia;
            case 2:
                await TerminarAula(usuario, frequenciaBanco, modulo_id);
                break;
        }
    }catch(erro){
        console.log(erro)
    }
}

//função para verificar a frequencia do usuario no menu
async function VerificarFrequencia(usuario, frequencia) {
    const usuarioDocRef = doc(db, "usuarios", usuario.uid)
    try {
        const usuarioDados = await getDoc(usuarioDocRef)
        let ultimaAtualizacao = usuarioDados.data().ultimoRegistro
        const registro = ultimaAtualizacao.toDate()


        // Crie uma data para a data atual
        const dataAtual = new Date();
        dataAtual.setHours(23, 58, 0, 0);

        // Use a função 'sub' para subtrair um dia
        const dataOntem = sub(new Date(), {days: 1})
        dataOntem.setHours(0, 0, 0);

        
        if (registro < dataOntem){
            await updateDoc(usuarioDocRef, {
                "frequencia": 0,
            });
            return usuarioDados.data().frequencia
        } else {
            return frequencia
        }
    }catch(erro) {
        console.log(erro);
    }  
}

//função para incrementtar a frequencia após o termino de uma aula
async function TerminarAula(usuario, frequencia, modulo_id) {

    let valor = false
    const usuarioDocRef = doc(db, "usuarios", usuario.uid)
    try {
        const subColecaoModulosRef = collection(usuarioDocRef, 'modulos');
        const moduloDocRef = doc(subColecaoModulosRef, modulo_id);

        const moduloDados = await getDoc(moduloDocRef);
        const progressoAula = moduloDados.data().aulas_concluida;
        const aula = moduloDados.data().aula

        await updateDoc(moduloDocRef, {
            "aulas_concluida": progressoAula + 1,
            "aula": aula + 1
        });;

        const usuarioDados = await getDoc(usuarioDocRef)
        let ultimoRegistro = usuarioDados.data().ultimoRegistro
        const registro = ultimoRegistro.toDate()

        //caso o usuario fique muito tempo sem mexer no aplicativo
        if(frequencia == 0) {
            valor = true
        }
        // Crie uma data para a data atual
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);

        // Use a função 'sub' para subtrair um dia
        const dataOntem = sub(new Date(), {days: 1})
        dataOntem.setHours(0, 0, 0);

        // Verifique se a última atualização foi antes de ontem
        if (registro <= dataAtual && (registro >= dataOntem || valor)) {
            const novaFrequencia = frequencia + 1;
            const ultimaAtualizacao = new Date();

            // Atualize o documento do usuário com a nova frequência e a data do último registro.
            await updateDoc(usuarioDocRef, {
                "frequencia": novaFrequencia,
                "ultimoRegistro": ultimaAtualizacao
            });
            return novaFrequencia;
        } else {
            return frequencia
        }
    }catch(erro) {
        consoçe.log('Erro ao concluir a aula: ', erro)
    }  
}

export async function PegarAula(setXpBarra, setMatriz, idModulo, usuario) {
    const usuarioDocRef = doc(db, "usuarios", usuario.uid)
    let valorAula

    const subColecaoModulosRef = collection(usuarioDocRef, 'modulos');
    const moduloDocRef = doc(subColecaoModulosRef, idModulo);
    const moduloDados = await getDoc(moduloDocRef);
    if (moduloDados.data().aula !== undefined) {
        valorAula = moduloDados.data().aula
    } else {
        await updateDoc(moduloDocRef, {
           "aula": 1,
        });
        valorAula = 1;
    }
    try {
        const moduloIdRef = doc(db, "modulos", idModulo)
        //const aulasRef = collection(moduloIdRef, 'aula_1')
        const aulaQuery = query(collection(moduloIdRef, `aula_${valorAula}`), orderBy('nome', 'asc'))
        const conteudoAula = await getDocs(aulaQuery);
        setXpBarra(conteudoAula.size)

        conteudoAula.forEach(doc => {
            setMatriz((prevMatriz) => [...prevMatriz, doc.data()]);
        })

    } catch (error) {
        console.log(error);
    }
}