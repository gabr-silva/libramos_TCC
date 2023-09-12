import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, Image} from 'react-native';

import { Modulo } from "../../components/BotaoModulos";
import BotaoPerfil from "../../components/BotaoPerfil";
import Frequencia from "../../components/Frequencia";
import style_modulo from "./style_modulos";
import { pegarModulos } from "../../servicos/firestore";

const Menu = ({ navigation }) => {
  const [modulos, setModulos] = useState([])
  const [frequencia, setFrequencia] = useState(0)

  useEffect(() => {
    pegarModulos()
  }, []); // O segundo argumento vazio garante que isso seja executado apenas uma vez


    return (
        <>
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
        <ScrollView>
        <View style={style_modulo.modulo}>
        {modulos.map((modulo, index) => (
          <Modulo
            key={index}
            aulasFinalizadas={modulo.aulasFinalizadas}
            totalAulas={modulo.aulasTotal}
            imagemOrigem={{ uri: modulo.imagem }}
            onPress={() => navigation.navigate('Aula')} // Substitua 'Aula' pelo nome da tela real
            aula={'Aula'}
          />
        ))}
          <Modulo
          aulasFinalizadas={5}
          totalAulas={10}
          imagemOrigem={require('../../../assets/capivaraTeste.png')}
          onPress={() => navigation.navigate('Aula')} // Replace 'Aula' with your actual screen name
          aula={'Aula'}
          /> 
          <Text style={{fontSize: 30}}>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</Text>
        </View>
        </ScrollView>
        </>
    );
}
export default Menu;