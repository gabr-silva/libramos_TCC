import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Modulo } from "../../components/BotaoModulos";
import BotaoPerfil from "../../components/BotaoPerfil";
import Frequencia from "../../components/Frequencia";
import { pegarModulos } from "../../servicos/firestore";
import style_modulo from "./style_modulos";

const Menu = ({ navigation }) => {
  const [modulos, setModulos] = useState([])
  const [frequencia, setFrequencia] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const modulosFirestore = await pegarModulos();
    setModulos(modulosFirestore);
    setRefreshing(false);
  }, [pegarModulos]);


  useEffect(() => {
      async function carregarDadosModulos() {
      const modulosFirestore = await pegarModulos()
      setModulos(modulosFirestore)
    }
    carregarDadosModulos()
  }, []);


    return (
        <>
        <SafeAreaView>
          <View style={style_modulo.topo}>
            <Text style={{color: 'white'}}>Ola, Fulano!</Text>
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
              return (
              <Modulo nome={modulo.nome} aulasFinalizadas={modulo.aula_concluida}
              totalAulas={modulo.aula_total} imagemOrigem={modulo.imagem}
              onPress={() => navigation.navigate('Aula')}
              key={modulo.id} />
              )
            })
          }
            <Text style={{fontSize: 30}}>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</Text>
          </View>
          </ScrollView>
        </SafeAreaView>
        </>
        
    );
}
export default Menu;