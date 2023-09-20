import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";

import { Modulo } from "../../components/BotaoModulos";
import BotaoPerfil from "../../components/BotaoPerfil";
import Frequencia from "../../components/Frequencia";
import { CriarModulos, PegarModulos } from "../../servicos/firestore";;
import style_modulo from "./style_modulos";

const Menu = ({ navigation }) => {
  const usuario = auth.currentUser;
  const [modulos, setModulos] = useState([])
  const [frequencia, setFrequencia] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const modulosFireStore = await PegarModulos(usuario)
    setModulos(modulosFireStore)
    CriarModulos(usuario)
    setRefreshing(false);
  }, [PegarModulos]);


  useEffect(() => {
      async function carregarDadosModulos() {
      await CriarModulos(usuario)
      const modulosFireStore = await PegarModulos(usuario)
      setModulos(modulosFireStore)
    }
    carregarDadosModulos()
  }, [PegarModulos]);



    return (
        <>
        <SafeAreaView>
          <View style={style_modulo.topo}>
            <Text style={{color: 'white'}}>Ola, {usuario.email}</Text>
            <BotaoPerfil
            imagemPerfil={require('../../../assets/capivaraTeste.png')}
            onPress={() => navigation.navigate('Perfil')}
            />
          </View>

          <Frequencia
          frequencia={frequencia}
          setFrequencia={setFrequencia}
          />
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            
          <View style={style_modulo.modulo}>
          {
            
            modulos.map((modulo)=> { 
              console.log(modulo.aulas_concluida)
              return (
              <Modulo nome={modulo.nome} aulasFinalizadas={modulo.aulas_concluida}
              totalAulas={modulo.aula_total} imagemOrigem={modulo.imagem}
              onPress={() => navigation.navigate('Aula')}
              key={modulo.id} />
              )
            })
          }
          </View>
          </ScrollView>
        </SafeAreaView>
        </>
        
    );
}
export default Menu;