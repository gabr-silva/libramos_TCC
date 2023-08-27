import React, {useState, useEffect} from "react";
import { View, Text} from 'react-native';

import { Modulo } from "../../components/BotaoModulos";
import { db } from "../../config/firebase";
import style_modulo from "./style_modulos";


const Menu = ({ navigation }) => {
  const [modulos, setModulos] = useState([])

    return (
        <>
        <View style={style_modulo.topo}>
          <Text>Libramos</Text>
        </View>
        <View style={style_modulo.modulo}>
          <Modulo 
          aulasFinalizadas={1}
          totalAulas={5}
          imagemOrigem={require('../../../assets/favicon.png')}
          onPress={() => navigation.navigate('Aula')} // Replace 'Aula' with your actual screen name
          aula={'Aula'}
          />
          <Modulo 
          aulasFinalizadas={5}
          totalAulas={10}
          imagemOrigem={require('../../../assets/capivaraTeste.png')}
          onPress={() => navigation.navigate('Aula')} // Replace 'Aula' with your actual screen name
          aula={'Aula'}
          /> 
        </View>
        </>
    );
}
export default Menu;