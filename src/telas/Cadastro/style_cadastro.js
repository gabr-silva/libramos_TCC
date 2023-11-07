import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 25,
        paddingHorizontal: 20,
        },
    input: {
        width: "100%",
        borderColor: "#e6e6e6",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: "#fff",
    },
    botaoCadastrar: {
        backgroundColor: "#54a0ff",
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 30,
        marginBottom: 15,
        elevation: 5
      },
    
      botaoCadastrarDisponivel: {
        backgroundColor: "red",
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 30,
        marginBottom: 15,
        elevation: 5
      },
});