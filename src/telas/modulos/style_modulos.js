import { StyleSheet,  Dimensions} from "react-native";

const { width, height } = Dimensions.get('window');

const style_modulo = StyleSheet.create({
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },  
})

export default style_modulo