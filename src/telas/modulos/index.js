import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { auth } from "../../config/firebase";

import AnimacaoCarregando from '../../../assets/AnimacaoCarregando.gif';

import { Modulo } from "../../components/modulos/BotaoModulos";
import BotaoPerfil from "../../components/modulos/BotaoPerfil";
import Frequencia from "../../components/modulos/Frequencia";
import ModalConfirmacao from "../../components/modulos/modal";
import { CriarModulos, PegarDados, PegarFrequencia, PegarModulos } from "../../servicos/firestore";
import style_modulo from "./style_modulos";

const Menu = ({navigation}) => {
  const usuario = auth.currentUser;
  const [dados, setDados] = useState([])
  const [nome, setNome] = useState('')
  const [modulos, setModulos] = useState([])
  const [modalVisivel, setModalVisivel] = useState(false);
  const [progressoModal, setProgressoModal] = useState(0);
  const [idModulo, setIdModulo] = useState(null)
  const [frequencia, setFrequencia] = useState(0)
  const [atualizaAuto, setAtualizaAuto] = useState(true)
  const [carregando, setCarregando] = useState(true)


  //função de atualização automatica
  const onAutoRefresh = async () => {
    const modulos = await PegarModulos(usuario)
    PegarFrequencia(usuario, 1)
    setModulos(modulos);
  }

  const AbrirModal = (idModulo, progresso) => {
     setProgressoModal(progresso);
     setIdModulo(idModulo)
    setModalVisivel(true)
  }

  useEffect(() => {
    const carregarDadosIniciais = async () => {
       try {
          CriarModulos(usuario);
          const dadosCarregados = await PegarDados(usuario);
          setDados(dadosCarregados)
          setNome(dadosCarregados.nome);
          //setFrequencia(dados.frequencia)
       } catch (error) {
          console.error('Erro ao carregar dados iniciais:', error);
       }
    };
    carregarDadosIniciais();
 }, []);

  useEffect(() => {
  const autoRefreshingInterval = setInterval(() => {
    if (atualizaAuto){
      onAutoRefresh();
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
      <View style={{ flex: 1}}>
      <View style={style_modulo.topo}>
        <Text style={style_modulo.textoBoasVindas}>Olá, {nome}! 👋</Text>
        <Text style={style_modulo.textoNivel}>{"\n"}Nível 1</Text>
        <BotaoPerfil
          style={style_modulo.imgPerfil}
          imagemPerfil={require('../../../assets/icon.png')}
          onPress={() => navigation.navigate('Perfil')}
        />
      </View>
    
      <Frequencia frequencia={frequencia} />

      <ScrollView>
            <View>
              {carregando ? (
                <View style={style_modulo.containerAnimacao}>
                  <Image source={AnimacaoCarregando} style={style_modulo.imagem} />
                </View>
              ) : (
                <>

                  {/* Renderizar o primeiro módulo sozinho no centro */}
                  <View style={style_modulo.scrollViewContent1}>
                  {modulos.length > 0 && (
                    <Modulo
                      nome={modulos[0].nome}
                      barra={modulos[0].aulas_concluida / modulos[0].aula_total}
                      imagemOrigem={modulos[0].imagem}
                      onPress={() => { AbrirModal(modulos[0].id, modulos[0].aulas_concluida) }}
                      key={modulos[0].id}
                    />
                  )}
                  </View>


                  {/* Renderizar os demais módulos em duas colunas */}
                  <View style={style_modulo.scrollViewContent2}>
                    {modulos.slice(1).map((modulo, index) => (
                      <Modulo
                        nome={modulo.nome}
                        barra={modulo.aulas_concluida / modulo.aula_total}
                        imagemOrigem={modulo.imagem}
                        onPress={() => { AbrirModal(modulo.id, modulo.aulas_concluida) }}
                        key={modulo.id}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        
        
        {modalVisivel?(
          <ModalConfirmacao
              texto={"Deseja ir para a aula?"}
              modalVisivel={modalVisivel}
              onClose={() => {setModalVisivel(false)}}
              tela={() => navigation.navigate('Aula', {id_modulo: idModulo})}
          />
        ):null}

        </View>
      </SafeAreaView>
    </>
  );
}

export default Menu;