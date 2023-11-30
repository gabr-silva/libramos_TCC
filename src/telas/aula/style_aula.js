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
        bottom: 24,
        marginLeft: 310,
        position: 'absolute'
    },

    textoVidas: {
        fontSize: 17,
        justifyContent: 'flex-end',
        marginLeft: 320,
        marginTop: 25,
        fontWeight: 'bold',
        color: '#408AED',
        bottom: 3
    },

    pontuacao: {
        paddingVertical: 10,
        fontSize: 20,
        color: 'white'
        backgroundColor: "#4b7bec",

    },

    containerCamLenta: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        bottom: 0,
        left: 0,
        right: 0,
    },

    textoBotaoConfirmar: {
        fontSize: 14,
        color: "#4B7BEC",
        marginTop: 5
    },

    iconeConfirmarContainer: {
        width: 70,
        height: 70,
        borderRadius: 20,
        borderColor: "transparent",
        backgroundColor: "#4B7BEC",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 18
    },

    iconeConfirmar: {
            width: 40,
            height: 40,
            resizeMode: 'contain',
            flex: 1
    
    },

    botaoVel: {
        padding: 10,
        width: "25%",
        height: 50,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: 'center',
    },

    textoLento: {
        fontSize: 14,
        color: "#4B7BEC",
        marginTop: 5
    },

    iconeLento: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        flex: 1
    },

    circuloIconeLento: {
        width: 70, 
        height: 70,
        borderRadius: 20,
        borderColor: "#CBCCCE",
        backgroundColor: "#fff",
        borderWidth: 1,
        alignItems: 'center',
        elevation: 2,
        justifyContent: 'center',
      },

    textoConteudo: {
        fontSize: 25,
        color: "red"
    },

    informativoVideoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      informativoVideo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '100%', 
      },
    
});

export default style; 