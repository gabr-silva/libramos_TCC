import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 40 : 25 //a primeira é para android e a segunda para IOS
    },
    textoPerfil:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 50,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    imagemPerfil: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20, // espaço adicional abaixo da imagem
    },
    text: {
      fontSize: 20,
      marginBottom: 10,
    },
});