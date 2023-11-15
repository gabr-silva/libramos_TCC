import React, { useEffect, useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { auth } from "../../config/firebase";

import AnimacaoCarregando from '../../../assets/AnimacaoCarregando.gif';

import { Modulo } from "../../components/modulos/BotaoModulos";
import BotaoPerfil from "../../components/modulos/BotaoPerfil";
import Frequencia from "../../components/modulos/Frequencia";
import ModalModulo from "../../components/modulos/modal";
import { CriarModulos, PegarDados, PegarFrequencia, PegarModulos } from "../../servicos/firestore";
import style_modulo from "./style_modulos";

const Menu = ({navigation}) => {
  const usuario = auth.currentUser;
  const [nome, setNome] = useState('')
  const [modulos, setModulos] = useState([])
  const [modalVisivel, setModalVisivel] = useState(false);
  const [progressoModal, setProgressoModal] = useState(0);
  const [idModulo, setIdModulo] = useState(null)
  const [frequencia, setFrequencia] = useState(0)
  const [atualizaManual, setAtualizaManual] = useState(false)
  const [atualizaAuto, setAtualizaAuto] = useState(true)
  const [carregando, setCarregando] = useState(true)

  //função de atualização manual
  const onRefresh = React.useCallback(async () => {
    setCarregando(true)
    setAtualizaManual(true);
    carregarDados()
    PegarFrequencia(usuario, 1)
    setAtualizaManual(false);
  }, [PegarModulos]);

  //função de atualização automatica
  const onAutoRefresh = async () => {
    const modulosFireStore = await PegarModulos(usuario);
    setModulos(modulosFireStore);
    CriarModulos(usuario);
  }

  const AbrirModal = (idModulo, progresso) => {
     setProgressoModal(progresso);
     setIdModulo(idModulo)
    setModalVisivel(true)
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

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={style_modulo.topo}>
            <Text style={{ color: 'white' }}>Olá, {nome}.</Text>
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
                barra_Modulo = modulo.aulas_concluida / modulo.aula_total;
                return (
                  <Modulo
                    nome={modulo.nome}
                    barra={barra_Modulo}
                    imagemOrigem={modulo.imagem}
                    onPress={() => {AbrirModal(modulo.id, modulo.aulas_concluida)}}
                    key={modulo.id}
                  />
                );
              })}
            </>
            )}

          </View>
        </ScrollView>
        
        
        {modalVisivel?(
          <ModalModulo
              modalVisivel={modalVisivel}
              onClose={() => setModalVisivel(false)}
              navigation={navigation}
              progresso={progressoModal}
              idModulo={idModulo}
          />
        ):null}
        <View>
          {/* Conteúdo da barra inferior */}
        </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Menu;