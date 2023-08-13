import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const BotaoImagem = ({ onPress, imagemOrigen }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={imagemOrigen} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#43B8FA',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
});

export default BotaoImagem
  
