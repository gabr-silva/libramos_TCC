import React, {useEffect} from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const Frequencia = ({frequencia}) => { 

    return (
        <>
        <View style={style.frequenciaContainer}>
          <Image 
            style={style.fogo}
            source={require('../../../assets/fogo.png')}
          />
          <Text>{frequencia}</Text>
        </View>
        </>
    );
};

const style = StyleSheet.create({
    frequenciaContainer: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        top: 120,
        left: 300,
        },
        
        fogo: {
        width: width * 0.16, // Largura proporcional à largura da tela
        height: width * 0.16, // Altura proporcional à largura da tela
        }, 
})

export default Frequencia