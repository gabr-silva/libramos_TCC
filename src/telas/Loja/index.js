import React from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";

const Loja = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/img/capivara-construcao.jpg')} 
        style={styles.backgroundImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: "contain",

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});

export default Loja;
