import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff", // Cor de fundo da tela
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
    textoBotaoCadastrar: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    
      },
);