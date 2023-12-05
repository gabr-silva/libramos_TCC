import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


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
                    <Text style={style.texto1}>{texto}</Text>      
                    <TouchableOpacity onPress={() => {onClose(); tela()}}>
                        <View style={style.texto2Container}>
                            <Text style={style.texto2}>Sim</Text>
                        </View>
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
        backgroundColor: '#3867d6',
        width: 342,
        height: 100,
        borderRadius: 20,
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        elevation: 5,

    },

    texto1:{
      fontSize: 20,
      textAlign: 'center',
      color: "#fff",
      marginTop: 7,
      marginBottom: 1
    },

    texto2:{
        fontSize: 17,
        textAlign: 'center',
        color: "#3867d6",
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
  
    },

    texto2Container:{
        backgroundColor: "#fff",
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 40,
        borderRadius: 12,
        marginTop: 5
    },

    BotaoFechar:{
        fontSize: 20,
        color: "blue"
    }
})