import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const style_modulo = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 10,
    },

    topo: {
        flexDirection: 'row',
        width: width,
        height: height - 850,
        backgroundColor: '#fff',
        elevation: 10,
        zIndex: 1,
    },

    scrollView: {
        flex: 1,
        backgroundColor: '#F9F8FA'
    },

    scrollViewContent1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },

    scrollViewContent2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 55
      },

    containerAnimacao:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imagemBandeira: {
        width: 100,
        height: 100,
    },

    containerBandeira:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    imagemCarregando: {
        width: width,
        height: height,
    },

    imgPerfil: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',
        alignSelf: 'center',
      },

    textoBoasVindas: {
        fontSize: 20,
        marginTop: 37,
        marginLeft: 15,
        justifyContent: "flex-start",
        color: "black",
        fontWeight: 'bold',
        position: 'absolute',
    },

    textoNivel: {
        fontSize: 15,
        color: "#808e9b",
        marginTop: 44,
        marginLeft: 15,
        justifyContent: 'flex-start',
        position: 'relative',
    },

    textoBandeira: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#52B1FF',
        padding: 5,
        borderRadius: 10,
        width: 120,
        elevation: 2,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#4AA4EE',
      }
})

export default style_modulo