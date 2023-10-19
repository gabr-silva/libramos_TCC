import React, { useState } from "react";
import {View, TouchableOpacity, Text, Alert } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { cadastrar } from "../../servicos/requisicoes";
import { Alerta } from "../../components/Alerta";
import style from "./style";
import { handleForgotPassword } from "firebase/auth"

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [statusError, setStatusError] = useState('')
  const [mensagemError, setMensagemError] = useState('')

  async function realizarCadastro(){
    if(nome == ''){
      setMensagemError('Preencha com um nome');
      setStatusError('nome')
    }else if(email == ''){
      setMensagemError('Preencha com seu email');
      setStatusError('email')
    } else if(senha == ''){
      setMensagemError('Digite sua senha');
      setStatusError('senha')
    } else if(confirmarSenha == ''){
      setMensagemError('Confirme seua senha');
      setStatusError('confirmarSenha')
    } else if (confirmarSenha != senha){
      setMensagemError('As senhas não são iguais');
      setStatusError('confirmarSenha')
    } else {
        const resultado = await cadastrar(nome, email, senha, confirmarSenha)
        if( resultado == 'sucesso'){
          Alert.alert('Usuário cadastrado com sucesso!')
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

  async function handleForgotPassword () {
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert ("Redefinir senha", "Enviamos um email para você"))
    .catch(error => console.log (error))
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
            label="E-mail"
            value={email}
            onChangeText={texto => setEmail(texto)}
            error={statusError == 'email'}
            messageError={mensagemError}
          />
          <EntradaTexto
            label="Senha"
            value={senha}
            onChangeText={texto => setSenha(texto)} 
            secureTextEntry
            error={statusError == 'senha'}
            messageError={mensagemError}
          />
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
    </View>
    );
}