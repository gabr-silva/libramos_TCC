import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, query, doc, where, getDocs,} from "firebase/firestore";
import { sub } from "date-fns";

function VerificaoErros(error){
    let mensagem ='';
    switch(error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem= "Esse email já existe";
            break;
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido";
            break;
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de no minimo 6 caracteres"
            break;
        case false:
            mensagem = "aaaaaa"
        default:
            mensagem = "Error ao cadastrar"
    }
    return mensagem
}

export async function cadastrar(nome, userName, email, senha) {
    try { 
        const dataOntem = sub(new Date(), {days: 1})

        const usuariosRef = collection(db, "usuarios");
        const usuarioUserName = query(usuariosRef, where("userName", "==", userName)); 
        
        // verificar se já existe alguem com esse username
        const usuarioQuery = await getDocs(usuarioUserName);
        if(!usuarioQuery.empty){
                return "UserName já existe";
        }
        else {
            const resultado = await createUserWithEmailAndPassword(auth, email, senha)
            const usuario = resultado.user;
            await setDoc(doc(db, "usuarios", usuario.uid), {
            nome: nome,
            email: usuario.email,
            frequencia: 0,
            userName: userName,
            ultimoRegistro: dataOntem
        });
        return "sucesso"
    }
    }catch(error) {
        console.log(error)
        if (error == "false") {
            return "userName ja existe"
        }
        return VerificaoErros(error)
    };
}

export async function logar(email, senha) {
        const resultado = await signInWithEmailAndPassword(auth, email, senha)
        .then((dadosDoUsuario) => {
            return "sucesso"
        })   
    .catch((error) => {
        //return VerificaoErros(error)
        return 'erro'
    });
    return resultado
}

