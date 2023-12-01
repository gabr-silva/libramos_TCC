import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');
const size = width - 330; // tamanho do botao de perfil
const radius = size / 2;

const BotaoImagem = ({ onPress, imagemOrigem }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={imagemOrigem} style={styles.image} />
    </TouchableOpacity>
  );
};

const BotaoPerfil = ({ imagemPerfil, onPress }) => {
  return (
    <View style={[styles.container, styles.sombra]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="#ccc"
        />
      </Svg>
      <BotaoImagem onPress={onPress} imagemOrigem={imagemPerfil} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    marginTop: 34,
    marginBottom: 7,
    marginRight: 13,
    justifyContent: 'flex-end',
    position: 'relative',
    marginLeft: 'auto',
  },

  button: {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden',
    resizeMode: "contain",
    position: 'absolute',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: size / 2,
    borderColor: "#4b7bec",
    borderWidth: 2.5,
    borderRadius: size / 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default BotaoPerfil;
