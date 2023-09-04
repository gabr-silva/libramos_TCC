import React from "react";
import { View, Image, Text, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const Frequencia = ({frequencia}) => {  
    return (
        <>
        <View style={style.frequenciaContainer}>
          <Image 
            style={style.fogo}
            source={require('../../assets/fogo.png')}
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
        width: width * 0.1, // Largura proporcional à largura da tela
        height: height * 0.1, // Altura proporcional à largura da tela
        }, 
})

export default Frequencia