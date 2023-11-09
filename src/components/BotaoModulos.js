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
    <Svg style={styles.circunferencia} >
    <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#3481D9" // cor do progresso
        strokeWidth={8}
        strokeDasharray={[circumference]}
        strokeDashoffset={circumference * (1 - progresso)}
        fill="transparent" />

        <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#fff" // separação entre as circunferencias
        strokeWidth={10}
        strokeDasharray={[circumference]}
        fill="transparent" 
        
        />

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ccc" // cor da base
        strokeWidth={10}
        fill="transparent" 
        position="absolute"
        />

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
    marginTop: 70,
    marginBottom: 25,
  },

  button: {
    //position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    bottom: 95,
    width: size - 20,
    height: size - 20,

  circunferencia: {
    width: size,
    height: size,
    position: 'absolute'
  },

  },
  image: {
    width: size - 15,
    height: size - 15,
    resizeMode: 'contain',
    borderRadius: size / 2,
    overflow: 'hidden',
  },
});

export { BotaoImagem, Modulo };

