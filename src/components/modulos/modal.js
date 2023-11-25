import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';


export default function ModalConfirmacao({texto ,modalVisivel, onClose, tela }){
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
                    <Text>{texto}</Text>      
                    <TouchableOpacity onPress={() => {onClose(); tela()}}>
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
        backgroundColor: '#303049',
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