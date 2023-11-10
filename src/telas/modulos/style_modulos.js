import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

const style_modulo = StyleSheet.create({
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        height: height - 850,
        backgroundColor: '#1C1C27',
        borderBottomColor: 'blue',
        borderWidth: 3,
    },
    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
    
      moduloContainer: {
        //width: width / 2 - 15, // Largura igual a metade da largura da tela com algum espaço para margens
        margin: 5,
        justifyContent: 'center',
    },

    containerAnimacao:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imagem: {
        width: width,
        height: height
    }
})

export default style_modulo