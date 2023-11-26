import React, { useEffect, useState } from "react";
import { Button, Image, Keyboard, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { auth } from "../../config/firebase";
import style from "./style";

import { PegarDados } from "../../servicos/firestore";

export default function Perfil({navigation}){
  const usuario = auth.currentUser;
  const [nome, setNome] = useState('')
  const [Sobrenome, setSobrenome] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [statusError, setStatusError] = useState('')
  const [mensagemError, setMensagemError] = useState('')

  function deslogar(){
    auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Inicio' }],
    });
  };

  useEffect(() => {
    const carregarDados = async () => {
       try {
          const dadosCarregados = await PegarDados(usuario);
          setNome(dadosCarregados.nome)
          setSobrenome(dadosCarregados.sobrenome)
          setUserName(dadosCarregados.userName)
          setEmail(usuario.email)

       } catch (error) {
          console.error('Erro ao carregar dados iniciais:', error);
       }
    };
    carregarDados();
 }, []);

  return <>
    <SafeAreaView style={style.safeArea}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View>
            <View style={style.textoPerfil}>
              <TouchableOpacity onPress={() => navigation.navigate('Modulos')}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text>Perfil de usuario</Text>
              <TouchableOpacity>
                <Text>Salvar</Text>
              </TouchableOpacity>
            </View>

            <View style={style.container}>
              <TouchableOpacity>
                <Image source={require('../../../assets/capivaraTeste.png')} style={style.imagemPerfil}/>
              </TouchableOpacity>
            
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

        <TouchableOpacity
          style={style.botaoEsqueceuSenha}
          onPress={() => navigation.navigate("RedefSenha")}>
          <Text style={{ alignSelf: "flex-end", marginBottom: 3, marginTop: 2, paddingRight: 3, backgroundColor: 'gray'}}>
            Mudar senha
          </Text>
        </TouchableOpacity>
              <Button title="Logout" onPress={deslogar} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  </>;;
}