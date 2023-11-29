import { StyleSheet } from "react-native";


const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 50 : 25 //a primeira é para android e a segunda para IOS
    },
    fundo:{
        width: "100%",
        height: "100%",
        backgroundColor: 'black'
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
    btnAtivo: {
        color: "green"
    },
    btnInativo: {
        color: 'red',
        opacity: 0.5
    },
    botaoVel: {
        padding: 10,
        width: "25%",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        color: 'white'
    }
});
export default style; 