import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { createUserWithEmailAndPassword, AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, addDoc, doc } from "firebase/firestore";

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
        default:
            mensagem = "Error ao cadastrar"
    }
    return mensagem
}

export async function cadastrar(email, senha) {
    try {
        
        const resultado = await createUserWithEmailAndPassword(auth, email, senha)
        const usuario = resultado.user;
        await setDoc(doc(db, "usuarios", usuario.uid), {
            email: usuario.email,
            senha: senha
        });
        return "sucesso"
    }catch(error) {
        console.log(error)
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