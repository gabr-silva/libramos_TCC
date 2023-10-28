import React, { useState} from "react";
import {View, TouchableOpacity, Text, Alert } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { cadastrar} from "../../servicos/requisicoes";
import { Alerta } from "../../components/Alerta";
import * as Progress from 'react-native-progress';
import style from "./style";

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [forcaSenha, setForcaSenha] = useState(0) 
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [statusError, setStatusError] = useState('')
  const [mensagemError, setMensagemError] = useState('')


const validarNome = (nome) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(nome)
}

const validarUserName = (userName) => {
  const regex = /^[A-Za-z0-9._]*$/;
  return regex.test(userName)
}

const validarSenha = (senha) => {
    const tamanhoMinimo = 6
    const letrasMinusculas = /[a-z]/.test(senha);
    const letrasMaiusculas = /[A-Z]/.test(senha);
    const numeros = /\d/.test(senha);
    const caracteresEspeciais = /[!@#$%¨&*=+{}?/|*´`;:"'()]/.test(senha);

    const nivelSenha =  
    (letrasMinusculas ? 0.25 : 0) +
    (letrasMaiusculas ? 0.25 : 0) +
    (numeros ? 0.25 : 0) +
    (caracteresEspeciais ? 0.25 : 0);
    
    setForcaSenha(nivelSenha)
}
const corBarra =(forcaSenha) => {
  if(forcaSenha > 0.75 ){
    return "#05f515"
  }else if (forcaSenha > 0.5 && forcaSenha <= 0.75) {
    return "green"; // senha forte
  } else if (forcaSenha == 0.5) {
    return "#fa9c50"; // senha média
  } else {
    return "red"; // senha fraca
  }
}

  async function realizarCadastro(){
    //verificação do campo nome
    if(nome == ''){
      setMensagemError('Preencha com um nome');
      setStatusError('nome')
    }else if (!validarNome(nome)){
      setMensagemError('Nome deve conter apenas letras')
      setStatusError('nome')
    }
    
    //verificação do campo userName
    else if(userName == ''){
      setMensagemError('Preencha com um userName');
      setStatusError('userName')
    }else if(validarUserName(userName) && userName.length < 3){
      setMensagemError('useName deve conter mais de 3 digitos e letras sem acentos')
      setStatusError('userName')
    }

    //verificação do campo email
    else if(email == ''){
      setMensagemError('Preencha com seu email');
      setStatusError('email')
    } 
    
    //verificação do campo senha
    else if(senha == ''){
      setMensagemError('Digite sua senha');
      setStatusError('senha')
    } 

    //verificação do campo de confirmar senha
    else if(confirmarSenha == ''){
      setMensagemError('Confirme seua senha');
      setStatusError('confirmarSenha')
    } else if (confirmarSenha != senha){
      setMensagemError('As senhas não são iguais');
      setStatusError('confirmarSenha')
    } else {
        const resultado = await cadastrar(nome, userName, email, senha)
        if(resultado === "sucesso"){
          Alert.alert('Cadastro concluido', 'Um e-mail de confirmação foi enviado!!')
          setNome('')
          setUserName('')
          setEmail('')
          setSenha('')
          setConfirmarSenha('')
          navigation.reset({
            index: 0, 
            routes: [{ name: 'Modulo' }],
          });
        }
      else {
        setStatusError('firebase')
        setMensagemError(resultado)
      }
    }
  }

    return (
        <View style={style.container}>
          <EntradaTexto
            label="Nome"
            value={nome}
            onChangeText={texto => setNome(texto)}
            error={statusError == 'nome'}
            messageError={mensagemError}
          />
          <EntradaTexto
            label="UserName"
            value={userName}
            onChangeText={texto => setUserName(texto)}
            error={statusError == 'userName'}
            messageError={mensagemError}
          />
          <EntradaTexto
            label="E-mail"
            value={email}
            onChangeText={texto => setEmail(texto)}
            error={statusError == 'email'}
            messageError={mensagemError}
          />
          <EntradaTexto
            label="Senha"
            value={senha}
            onChangeText={(texto) => {
              setSenha(texto);
              validarSenha(texto); // Atualize a força da senha instantaneamente
            }}
            secureTextEntry
            error={statusError == 'senha'}
            messageError={mensagemError}
          />
          <Progress.Bar progress={forcaSenha} width={250} height={10} color={corBarra(forcaSenha)}/>
          <Text>Nivel de segurança</Text>
          <EntradaTexto
            label="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={texto => setConfirmarSenha(texto)}
            secureTextEntry
            error={statusError == 'confirmarSenha'}
            messageError={mensagemError}
          />

          <Alerta 
            mensagem={mensagemError}
            error={statusError == 'firebase'}
            setError={setStatusError}
          />
        <TouchableOpacity onPress={() => realizarCadastro()}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Já possui uma conta?</Text>
        </TouchableOpacity>
    </View>
    );
}