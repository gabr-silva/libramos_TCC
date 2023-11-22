import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const style_modulo = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'flex-start',
        width: width,
        height: height,
        flexDirection: 'row',
        //position: 'relative',
        //paddingHorizontal: 20,
    },

    topo: {
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        //alignItems: 'auto',
        width: width,
        height: height - 850,
        backgroundColor: '#fff',
        elevation: 10,
        zIndex: 1,
        //shadowOpacity: 0.8,
        //borderBottomColor: "black",
        //borderBottomWidth: 2
    },

    scrollView: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',

    },

    scrollViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        //justifyContent: 'center',
        //alignItems: 'center',
        //paddingHorizontal: 10,
      },
    
      moduloContainer: {
        margin: 5,
        justifyContent: 'space-evenly',
        //alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    

    containerAnimacao:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imagem: {
        width: width,
        height: height
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
        //alignSelf: "center",
        marginTop: 35,
        marginLeft: 15,
        justifyContent: "flex-start",
        color: "black",
        fontWeight: 'bold',
        position: 'absolute',
    },

    textoNivel: {
        fontSize: 15,
        color: "#808e9b",
        marginTop: 42,
        marginLeft: 15,
        justifyContent: 'flex-start',
        position: 'relative',
    }
})

export default style_modulo