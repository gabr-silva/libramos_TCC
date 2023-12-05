import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';


//calculo para o tamanho do circulo
const {width} = Dimensions.get("window")
const size = width - 270;
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
    <Text style={styles.textoNome}>{nome}</Text>
    <Svg style={styles.circunferencia} >

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#d1d8e0" // separação entre as circunferencias
        strokeWidth={10}
        strokeDasharray={[circumference]}
        fill="transparent"/>

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4b7bec" // cor do progresso
        strokeWidth={10}
        strokeDasharray={[circumference]}
        strokeDashoffset={circumference * (1 - progresso)}
        strokeLinecap="round"
        fill="transparent" />
        
        </Svg>
        <BotaoImagem onPress={onPress} imagemOrigem={imagemOrigem} />
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 10,
    width: size,
    height: size,
    marginHorizontal: 7,
  },

  circunferencia: {
    width: size,
    height: size,
    position: 'relative',
    marginTop: 1
  },

  button: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 105,
    width: size - 20,
    height: size - 20,
    
  },
  
  image: {
    width: size - 17,
    height: size - 17,
    resizeMode: 'contain',
    borderRadius: size / 2,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: "center"
  },
  
  textoNome: {
    textAlign: 'center',
    fontSize: 18,
    width: size,
    marginBottom: 3,
  }
});

export { BotaoImagem, Modulo };

