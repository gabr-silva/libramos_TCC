import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

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

export async function cadastrar(nome, email, senha) {
    try {  
        const registro = sub(new Date(), {days: 1})
        const resultado = await createUserWithEmailAndPassword(auth, email, senha)
        const usuario = resultado.user;
        await setDoc(doc(db, "usuarios", usuario.uid), {
            nome: nome,
            email: usuario.email,
            frequencia: 0,
            ultimoRegistro: registro
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

