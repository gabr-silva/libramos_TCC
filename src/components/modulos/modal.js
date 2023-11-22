import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


const VerificarProgresso = ({navigation},progresso, id) => {
    if(progresso == 0) {
      navigation.navigate("Ensino", {id_modulo: id})
    } else {
      navigation.navigate("Aula", {id_modulo: id})
    }
  }

export default function ModalModulo({ modalVisivel, onClose, navigation, progresso, idModulo}){
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
            <View style={[style.ModalContainer]}>
                {/* Conteúdo da modal */}
                <View style={[style.ModalConteudo]}>
                    <Text>Deseja ir para a próxima tela?</Text>      
                    <TouchableOpacity onPress={() => {onClose, VerificarProgresso({navigation}, progresso, idModulo)}}>
                            <Text>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const style = StyleSheet.create({
     ModalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    ModalConteudo:{
        backgroundColor: '#87ABFF',
        width: 342,
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        textAlign: 'center'
    },
    Texto:{
      fontSize: 20,
      textAlign: 'center',
    },
    BotaoFechar:{
        fontSize: 20,
        color: "blue"
    }
})