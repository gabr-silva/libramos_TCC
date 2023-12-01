import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff", // Cor de fundo da tela
        marginTop: 20
        },

        scrollView: {
          flex: 1,
          backgroundColor: '#fff'
        },

    input: {
      width: "100%",
      marginBottom: 15,
    },
    botaoCadastrarAtivo: {
      backgroundColor: "#54a0ff",
      borderRadius: 25,
      padding: 10,
      alignItems: "center",
      width: "100%",
      marginTop: 30,
      marginBottom: 15,
      elevation: 5,
    },
  
    botaoCadastrarInativo: {
      backgroundColor: "#54a0ff",
      opacity: 0.5,
      borderRadius: 25,
      padding: 10,
      alignItems: "center",
      width: "100%",
      marginTop: 30,
      marginBottom: 15,
      elevation: 5,
    },

    textoBoasVindas: {
      fontSize: 25,
      fontWeight: "bold",
      alignSelf: "center",
      marginBottom: 0,
      marginTop: 5,
      marginLeft: 5
    },
  
    textoBoasVindas2: {
      fontSize: 15,
      alignSelf: "center",
      marginBottom: 10,
      marginTop: 5,
      marginLeft: 5,
      textAlign: "center",
      color: "#70767d",
      fontWeight: "500"
    },

    textoBotaoCadastrar: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },

    imagem: {
      width: 100,
      height: 100,
      resizeMode: "contain",
      marginTop: 20,
      marginBottom: 10,
    },

    conjuntoIconesAutenticacao: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15 ,
      resizeMode: "contain",
    },
  
    iconeAutenticacao: {
      width: 25,
      height: 25,
      resizeMode: "contain",
      flex: 1,
      justifyContent: "space-between",
    },
  
    iconeCirculo: {
      width: 50, // Largura do círculo
      height: 50, // Altura do círculo
      borderRadius: 25, // Metade da largura/altura para criar um círculo
      borderColor: "#CBCCCE",
      backgroundColor: "#fff",
      borderWidth: 1, // espessura do círculo
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 10,
      elevation: 2
    },
    
      },
);