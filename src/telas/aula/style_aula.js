import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 50 : 25, //a primeira é para android e a segunda para IOS
        backgroundColor: '#fff',
    },
    fundo: {
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
    },

    iconeX: {
        width: 21,
        height: 21,
        marginLeft: 14,
        marginBottom: 1,
    },

    barraProgresso: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 50,
        position: 'absolute',
    },

    iconeCoracao: {
        width: 30,
        height: 30,
        marginLeft: 310,
        marginBottom: 25,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute'
    },

    textoVidas: {
        fontSize: 17,
        justifyContent: 'flex-end',
        marginLeft: 319,
        marginTop: 25,
        fontWeight: 'bold',
        color: '#408AED'
    },

    pontuacao: {
        paddingVertical: 10,
        fontSize: 20,
        color: 'white'
    },

    conteinerCamLenta: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        bottom: 0,
        left: 0,
        right: 0,
    },

    btnConfirmar: {
        color: "blue"
    },

    botaoVel: {
        padding: 10,
        width: "25%",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        color: 'white'
    },

    textoElemento: {
        fontSize: 20
    },
    
});
export default style; 