import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor:  "gray",
        paddingTop: Platform.OS === 'android' ? "12%" : 0
    },
    
    fundo:{
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
    },

    botaoVel: {
        padding: 15,
        width: "25%",
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
        marginTop: 10,
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
        width: '100%', // Usar 100% da largura disponível
        aspectRatio: 16 / 9, // Proporção 16:9 (ou ajuste conforme necessário)
        borderRadius: 10,
        marginVertical: 50,
        marginHorizontal: 20,
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
    btnConfirmar: {
        color: "blue"
    },    
});
export default style; 