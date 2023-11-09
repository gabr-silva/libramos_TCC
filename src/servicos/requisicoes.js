import { sub } from "date-fns";
import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where, } from "firebase/firestore";
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
            mensagem = "A senha precisa ter no minimo 6 caracteres"
            break;
        default:
            mensagem = "Error ao cadastrar"
            console.log(error);
    }
    return mensagem
}

export async function cadastrar(nome, sobrenome, userName, email, senha) {
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
            sobrenome: sobrenome,
            email: usuario.email,
            frequencia: 0,
            userName: userName,
            ultimoRegistro: dataOntem
            })

            const user = getAuth().currentUser
            await sendEmailVerification(user)
            return "sucesso"
        }
    }catch(error) {
        return VerificaoErros(error)
    };
}

export async function logar(email, senha) {
    try{
        const resultado = await signInWithEmailAndPassword(auth, email, senha)
        if(resultado.user.emailVerified){
            return 'sucesso';
        } else {
            return 'NaoVerificado';
        }
    } catch (error) {
        return 'erro'
    }
}

//mudar de senha
export async function redefinirSenha(email) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Email de redefinição	enviado
        alert("O email de redefinição de senha foi enviado!")
    })
    .catch((error) => {
        alert(error)
    })
}