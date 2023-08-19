import React, {useState} from "react";
import { View, Text, StyleSheet } from 'react-native';

import { Modulo } from "../../components/BotaoModulos";
import style_modulo from "./style_modulos";


const Menu = ({ navigation }) => {
    return (
        <>
        <View style={style_modulo.topo}>
          <Text>Libramos</Text>
        </View>
        <View style={style_modulo.modulo}>
          <Modulo 
          progresso={0.9}
          imagemOrigem={require('../../../assets/favicon.png')}
          onPress={() => navigation.navigate('Aula')} // Replace 'Aula' with your actual screen name
          aula={'Aula'}
          />

          <Modulo
            style={{backgroundColor: 'pink'}} 
            progresso={0.9}
            imagemOrigem={require('../../../assets/favicon.png')}
            onPress={() => navigation.navigate('Aula')} // Replace 'Aula' with your actual screen name
            aula={'Aula'}
            /> 
        </View>
        </>
    );
}
export default Menu;