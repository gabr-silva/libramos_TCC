import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';


//calculo para o tamanho do circulo
const {width} = Dimensions.get("window")
const size = width - 280;
const strokeWidth = 10;
const radius = (size - strokeWidth) / 2
const circumference = radius * 2 * Math.PI;


//botao que contem o caminho da imagem e a tela
const BotaoImagem = ({ onPress, imagemOrigem }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image source={{ uri: `${imagemOrigem}`}} style={styles.image} />
      </TouchableOpacity>
  );
};

//função que contem a barra circular
const Modulo = ({nome, barra, imagemOrigem, onPress}) => {
  
  const progresso = parseFloat(barra.toFixed(2))

  return (
    <View style={styles.container}>
    <Text>{nome}</Text>
    <Svg width={size} height={size} >
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#404258"
        strokeWidth={8}
        fill="transparent" />
        <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="blue"
        strokeWidth={4}
        strokeDasharray={[circumference]}
        strokeDashoffset={circumference * (1 - progresso)}
        fill="transparent" />
        </Svg>
        <BotaoImagem
        onPress={onPress}
        imagemOrigem={imagemOrigem} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    marginTop: 10,
    marginBottom: 25,
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

export { BotaoImagem, Modulo };

