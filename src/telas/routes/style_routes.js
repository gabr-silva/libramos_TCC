import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    icone: {
        alignItems: "center",
        marginTop: 5,    
    },

    imagem: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginTop: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
      }
 
  });

  export default style