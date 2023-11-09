import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Dicionario = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/img//capivara-construcao.jpg')} 
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});

export default Dicionario;