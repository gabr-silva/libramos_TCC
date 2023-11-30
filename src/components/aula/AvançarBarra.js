import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AvançarBarra({ modalVisivel, onClose, ponto ,avançarLicao }){
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={onClose}>
                <View style={style.Container}>
                    <Text style={style.Texto}>
                        {ponto}
                    </Text>
                    <TouchableOpacity onPress={() =>{avançarLicao(), onClose()}}>
                        <Text style={style.BotaoFechar}>{"->"}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>);
};

const style = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: 'red', // Fundo transparente
        width: 342,
        height: 70,
        top: 600,
        left: 9,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center',
    },
    Texto: {
        fontSize: 32,
        textAlign: 'center',
        color: '#3498db', // Cor do texto (azul)
    },
    BotaoFechar: {
        marginStart: 20,
        fontSize: 50,
        color: '#3498db', // Cor do botão de fechar (azul)
    },
})