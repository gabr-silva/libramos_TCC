import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const Frequencia = ({frequencia}) => { 

    return (
        <>
        <View style={style.frequenciaContainer}>
          <Image 
            style={style.fogo}
            source={require('../../../assets/fogo.png')}
          />
          <Text style={style.texto}>{frequencia}</Text>
        </View> 
        </>
    );
};

const style = StyleSheet.create({
    frequenciaContainer: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        top: 170,
        left: 325,
        },
        
        fogo: {
        width: width * 0.13, // Largura proporcional à largura da tela
        height: width * 0.13, // Altura proporcional à largura da tela
      }, 

      texto: {
        color: '#ff6348',
        fontWeight: 'bold'
      }
})

export default Frequencia