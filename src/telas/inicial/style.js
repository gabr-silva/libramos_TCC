import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff", // cor de fundo da tela
        },

    botaoCadastro: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 10,
        alignItems: "center",
        width: "100%",
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5,
        justifyContent: 'flex-end',
        
        },

    textoBotaoCadastro: {
        color: "#00AAF3",
        fontSize: 20,
        fontWeight: "bold",
        },

    imgCapivara: {
        width: 325,
        height: 325,
        resizeMode: "contain",
        marginTop: 10,
        marginBottom: 5,
        justifyContent: "flex-start"
        },

    imgLogotipo: {
        width: 360,
        height: 150,
        resizeMode: "contain",
        marginTop: 30,
        marginBottom: 5,
        justifyContent: "center"
        },

    textoOnboarding: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20
    }

});


export default style;