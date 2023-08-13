import React from "react";
import { View, Text, TouchableOpacity} from 'react-native';

import BotaoImagem from "../components/BotaoModulos";
import style_modulo from "./style_modulos";

const Menu = ({navigation}) => {
    return<>
        <View style={style_modulo.topo}>
            <Text>Libramos</Text>

        </View>

        <View>
           <BotaoImagem 
            onPress={() => navigation.navigate('Aula')}
            imagemOrigen={require('../../../assets/favicon.png')}
           />
        </View>
    </>
} 

export default Menu;