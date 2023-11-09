import React, { useEffect, useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { auth } from "../../config/firebase";

import AnimacaoCarregando from '../../../assets/AnimacaoCarregando.gif';
import { Modulo } from "../../components/BotaoModulos";
import BotaoPerfil from "../../components/BotaoPerfil";
import Frequencia from "../../components/Frequencia";
import { CriarModulos, PegarDados, PegarFrequencia, PegarModulos } from "../../servicos/firestore";
import style_modulo from "./style_modulos";

const Menu = ({ navigation }) => {
  const usuario = auth.currentUser;
  const [nome, setNome] = useState('')
  const [modulos, setModulos] = useState([])
  const [frequencia, setFrequencia] = useState(0)
  const [atualizaManual, setAtualizaManual] = useState(false)
  const [atualizaAuto, setAtualizaAuto] = useState(true)
  const [carregando, setCarregando] = useState(true)

  //função de atualização manual
  const onRefresh = React.useCallback(async () => {
    setCarregando(true)
    setAtualizaManual(true);
    carregarDados()
    PegarFrequencia(usuario)
    setAtualizaManual(false);
  }, [PegarModulos]);

  //função de atualização automatica
  const onAutoRefresh = async () => {
    const modulosFireStore = await PegarModulos(usuario);
    setModulos(modulosFireStore);
    CriarModulos(usuario);
  }

  async function carregarDados() {
      const dados = await PegarDados(usuario)
      setFrequencia(dados.frequencia)
      setNome(dados.nome)
      await CriarModulos(usuario)
      PegarFrequencia(usuario, 1)
      const modulosFireStore = await PegarModulos(usuario)
      setModulos(modulosFireStore)
  }

  useEffect(() => {
  const autoRefreshingInterval = setInterval(() => {
    if (atualizaAuto){
      onAutoRefresh();
      carregarDados();
      setCarregando(false)
    }
  }, 10000); // atualiza a cada 10 segundos

  return() =>{
    clearInterval(autoRefreshingInterval);
  };

  }, [atualizaAuto]);

  const VerificarProgresso = (progresso) => {
    if(progresso == 0) {
      navigation.navigate("Ensino")
    } else {
      navigation.navigate("Aula")
    }
  }

  return (
    <>
    <SafeAreaView>
      <View style={style_modulo.topo}>
        <Text style={{color: 'white'}}>Olá, {nome}.</Text>
        <BotaoPerfil
        imagemPerfil={require('../../../assets/capivaraTeste.png')}
        onPress={() => navigation.navigate('Perfil')}
        />
      </View>

      <ScrollView
      refreshControl={
        <RefreshControl refreshing={atualizaManual} onRefresh={onRefresh} />
      }>
        <View style={style_modulo.modulo}>
          {carregando ? ( // Renderizar tela de carregamento se carregando for verdadeiro
            <View style={style_modulo.containerAnimacao}>
              <Image source={AnimacaoCarregando} style={style_modulo.imagem} />
            </View>
          ) : (
            <>
              <Frequencia frequencia={frequencia} />
              {modulos.map((modulo) => {
                barra = modulo.aulas_concluida / modulo.aula_total;

                return (
                  <Modulo
                    nome={modulo.nome}
                    barra={barra}
                    imagemOrigem={modulo.imagem}
                    onPress={() => VerificarProgresso(modulo.aulas_concluida)}
                    key={modulo.id}
                  />
                );
              })}
            </>
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
export default Menu;