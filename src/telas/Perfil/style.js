import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 40 : 25, //a primeira é para android e a segunda para IOS
      backgroundColor: "#fff",
      alignContent: 'center',
    },

    textoPerfil: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 50,
    },

    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 12,
    },

    imagemPerfil: {
      alignSelf: 'center',
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 10,
      marginBottom: 10, 
    },

    text: {
      fontSize: 20,
      marginBottom: 10,
    },

    iconeX: {
      width: 21,
      height: 21,
      alignSelf: 'flex-start',
      marginLeft: 17,
      marginTop: 5
  },

  textoUsuario: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 10,
    left: 75
  },

  textoSenha: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    marginTop: 20,
  },

  botaoSair: {
    alignItems: "center",
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 20,
    top: 120,
  },

  textoBotaoSair: {
    color: 'black',
    textDecorationLine: 'underline',
    fontSize: 15,
  },

  botaoSalvar: {
    backgroundColor: '#1e90ff',
    width: 150, // Largura do botão
    height: 40, // Altura do botão (ajuste conforme necessário)
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center', // Centralizar verticalmente
    textAlign: 'center', // Centralizar horizontalmente
    padding: 5,
    elevation: 2,
  },

  textoBotaoSalvar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  
});