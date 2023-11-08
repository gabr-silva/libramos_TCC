import React, {useState, useEffect} from "react";
import {View, TouchableOpacity, Text, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { cadastrar} from "../../servicos/requisicoes";
import { Alerta } from "../../components/Alerta";
import * as Progress from 'react-native-progress';
import style from "./style_cadastro";

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('')
  const [Sobrenome, setSobrenome] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [forcaSenha, setForcaSenha] = useState(0) 
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [statusError, setStatusError] = useState('')
  const [mensagemError, setMensagemError] = useState('')
  const [botaoCadastrar, setBotaoCadastrar] = useState(false)

  useEffect(() => {
    // atualiza o estado do botão instantaneamente quando o email ou senha é alterado
      if (nome.length >= 1 && Sobrenome.length >= 1 && userName.length >= 1 && email.length >= 1 && senha.length >= 1 && confirmarSenha.length >= 1) {
        setBotaoCadastrar(true);
      } else {
        setBotaoCadastrar(false);
    }
  }, [nome,Sobrenome, userName, email, senha, confirmarSenha]);

const validarNome = (nome) => {

  //.include se torna verdadeiro se contem espaço
  if(nome.includes(' ')){
    const nomeArrumado = nome.replace(/\s+/g, ' '); // caso tenha mais de um espaço irar remove-lo

    const partesNome = nomeArrumado.split(' ') //separa os conteudos depois do espaço em array
    if(partesNome[1].trim() !== ''){ //verifica se no segundo array não esta vazia
      setNome(nomeArrumado)
    } else {
      const nomeSemEspaço = partesNome[0].trim() //se não tiver nada depois do espaço tira ele
      setNome(nomeSemEspaço)
    }
  }
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(nome) //valida para ver se só contem letras e espaço
}

const validarSobrenome = (Sobrenome) => {
  //.include se torna verdadeiro se contem espaço
  if(Sobrenome.includes(' ')){
    const sobrenomeArrumado = Sobrenome.replace(/\s+/g, ' '); // caso tenha mais de um espaço irar remove-lo

    const partesNome = sobrenomeArrumado.split(' ') //separa os conteudos depois do espaço em array
    if(partesNome[1].trim() !== ''){ //verifica se no segundo array não esta vazia
      setSobrenome(sobrenomeArrumado)
    } else {
      const nomeSemEspaço = partesNome[0].trim() //se não tiver nada depois do espaço tira ele
      setSobrenome(nomeSemEspaço)
    }
  }
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(nome) //valida para ver se só contem letras e espaço
}

const validarUserName = (userName) => {
  const regex = /^[A-Za-z0-9._]*$/;
  return regex.test(userName)
}

const validarSenha = (senha) => {
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
    return "#05f515" //senha muito forte
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
    if (!validarNome(nome)){
      setMensagemError('Nome deve conter apenas letras')
      setStatusError('nome')}

    //verificação do campo sobrenome
    else if(!validarSobrenome(Sobrenome)){
        setMensagemError('Sobrenome deve conter apenas letras sem espaço')
        setStatusError('sobrenome')}
    //verificação do campo userName
    else if(validarUserName(userName) && userName.length < 3){
      setMensagemError('useName deve conter mais de 3 digitos e letras sem acentos')
      setStatusError('userName')}

    else if (confirmarSenha != senha){
      setMensagemError('As senhas não são iguais');
      setStatusError('confirmarSenha')}
    
    //após todos os campos estarem corretos
    else {
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
            routes: [{ name: 'Login' }],
          });
        }
      else {
        setStatusError('firebase')
        setMensagemError(resultado)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <EntradaTexto
          label="Nome"
          value={nome}
          onChangeText={texto => setNome(texto)}
          error={statusError == 'nome'}
          messageError={mensagemError}
        />
        <EntradaTexto      
          label="Sobrenome"
          value={Sobrenome}
          onChangeText={texto => setSobrenome(texto)}
          error={statusError == 'sobrenome'}
          messageError={mensagemError}
          disable={!nome}
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
        {senha.length > 0 && (
          <>
            <Progress.Bar progress={forcaSenha} width={250} height={10} color={corBarra(forcaSenha)}/>
            <Text>Nível de Senha</Text>
          </> 
        )}
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
        <TouchableOpacity style={botaoCadastrar ? style.botaoCadastrar : style.botaoCadastrarDisponivel} onPress={() => realizarCadastro()} disabled={!botaoCadastrar}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Já possui uma conta?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <View>
            <Text>Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}