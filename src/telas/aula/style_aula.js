import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    topo: {
        width: "100%",
        height: 578 / 768,
        backgroundColor: 'black'
    },
    
    fundo:{
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
    },

    botaoVel: {
        padding: 10,
        width: "100%",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        color: 'white'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopColor: '#ccc',
    },
    barraIni: {
        paddingVertical: 2,
        fontSize: 25,
        backgroundColor: '#4285F4'
    },
    pontuacao: {
        paddingVertical: 10,
        fontSize: 20,
        color: 'white'
    },
    botaoAlternativas: {
        backgroundColor: '#4285F4',
        padding: 10,
        width: 150,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 20,
    },
    video: {
        width: 300,
        height: 200,
        marginTop: 50,
        borderRadius: 10,
        marginHorizontal: 50
    },
    selecaoOpcao:{
        width: "100%",
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 20,
    },
    modalContainer:{
        flexDirection: 'row',
        backgroundColor: '#303049',
        width: 342,
        height: 70,
        top: 600,
        left: 9,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center'
    },
    modalTexto:{
        fontSize: 32,
        textAlign: 'center',
    },
    ModalBotaoFechar: {
        marginStart: 20,
        fontSize: 50
    },
    btnConfirmar: {
        color: "blue"
    },

    //style da parte de verificarVida
    modalContainerVida:{
        backgroundColor: '#303049',
        width: 342,
        height: 60,
        top: 600,
        left: 20,
        borderRadius: 20,
        alignItems: 'center',
        textAlign: 'center'
    },
    modalTextoVida:{
      fontSize: 20,
      textAlign: 'center',
    },
    ModalBotaoFecharVIda:{
        fontSize: 20,
        color: "blue"
    }
       
});
export default style; 