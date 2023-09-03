import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';


//calculo para o tamanho do circulo
const {width} = Dimensions.get("window")
const size = width - 300;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2

const BotaoImagem = ({ onPress, imagemOrigem }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={imagemOrigem} style={styles.image} />
        </TouchableOpacity>
    );
};

const BotaoPerfil = ({imagemPerfil, onPress}) => {  
    return (
      <View style={styles.container}>
      <Svg width={size} height={size} >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent" />
          </Svg>
          <BotaoImagem
          onPress={onPress}
          imagemOrigem={imagemPerfil} />
      </View>
  
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
      marginTop: 10
    },
    button: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 20,
      top: 20,
      width: size - 40,
      height: size - 40,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
  });

export default BotaoPerfil