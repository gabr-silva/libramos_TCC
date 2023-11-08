import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import FacebookIcon from '../../../assets/img/facebook_logo.png';
import GoogleIcon from '../../../assets/img/google_logo.png';
import MicrosoftIcon from '../../../assets/img/microsoft_logo.png';
import { Alerta } from "../../components/Alerta";
import { EntradaTexto } from "../../components/EntradaTexto";
import { logar } from "../../servicos/requisicoes";
import style from "./style_login";


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [botaoLogar, setBotaoLogar] = useState(false)
  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");

  useEffect(() => {
    // atualiza o estado do botão instantaneamente quando o email ou senha é alterado
      if (email.length >= 1 && senha.length >= 1) {
        setBotaoLogar(true);
      } else {
        setBotaoLogar(false);
    }
  }, [email, senha]);

  async function realizarLogin() {
    const resultado = await logar(email, senha)
    if (resultado == 'erro'){
        setStatusError('firebase')
        setMensagemError('email ou senha incorreta')
    }else if (resultado == 'NaoVerificado'){
        setStatusError('firebase')
        setMensagemError('O seu email não foi verificado, olhe a sua caixa de E-mail')
    }else{
        navigation.reset({
            index: 0, // Define o índice da rota que deve ser exibida após o reset
            routes: [{ name: 'Modulo' }], // Define a rota de destino após o reset
          });
    }
  }

    

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={style.container}>
        <Image source={require("../../../assets/capivaraTeste.png")} style={style.imagem} />

        <Text style={style.textoBoasVindas}>Ei, você está de volta!</Text>
        <Text style={style.textoBoasVindas2}>
          É bom ter você por aqui 👋{"\n"}Faça login na sua conta abaixo
        </Text>

        <EntradaTexto
          label="E-mail"
          value={email}
          onChangeText={(texto) => setEmail(texto)}
          error={statusError === "email"}
          messageError={mensagemError}
          style={style.input}
        />

        <EntradaTexto
          label="Senha"
          value={senha}
          onChangeText={(texto) => setSenha(texto)}
          secureTextEntry
          error={statusError === "senha"}
          messageError={mensagemError}
          style={style.input}
        />

        <TouchableOpacity
          style={style.botaoEsqueceuSenha}
          onPress={() => navigation.navigate("RedefSenha")}
        >
          <Text style={{ color: "#70767d", textDecorationLine: "underline" }}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        <Alerta mensagem={mensagemError} error={statusError === "firebase"} setError={setStatusError} />

        <TouchableOpacity style={botaoLogar ? style.botaoEntrar : style.botaoEntrarDisponivel} onPress={() => realizarLogin()} activeOpacity={0.8} disabled={!botaoLogar}>
          <Text style={style.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>

        <Text style={{ color: "#ccc", marginTop: 15, marginBottom: 15 }}>
          ─────────<Text style={{ color: "#7f7e7f" }}> ou Entrar com </Text>
          <Text style={{ color: "#ccc" }}>──────────</Text>
        </Text>

        <View style={style.conjuntoIconesAutenticacao}>
          <TouchableOpacity style={style.iconeCirculo} activeOpacity={0.8}>
            <View>
              <Image source={GoogleIcon} style={style.iconeAutenticacao} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={style.iconeCirculo} activeOpacity={0.8}>
            <View>
              <Image source={FacebookIcon} style={style.iconeAutenticacao} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={style.iconeCirculo} activeOpacity={0.8}>
            <View>
              <Image source={MicrosoftIcon} style={style.iconeAutenticacao} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate("Cadastro")}>
          <Text style={{ alignSelf: "flex-end", marginTop: 15 }}>
            Não tem uma conta? <Text style={{ fontWeight: "bold", color: "#2e86de" }}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
   </TouchableWithoutFeedback>
  );
}