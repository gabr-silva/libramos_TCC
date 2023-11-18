import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AvançarBarra({ modalVisivel, onClose, ponto ,avançarLicao }){
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={onClose}>
                <View style={style.Container}>            
                    {/* Texto */}
                    <Text style={style.Texto}>
                        {ponto}
                    </Text>
                    {/* Botão */}
                    <TouchableOpacity onPress={() =>{avançarLicao(), onClose()}}>
                        <Text style={style.BotaoFechar}>{"->"}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>);
};

const style = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        backgroundColor: '#303049',
        width: 342,
        height: 70,
        top: 600,
        left: 9,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center'
    },
    Texto:{
        fontSize: 32,
        textAlign: 'center',
    },
    BotaoFechar: {
        marginStart: 20,
        fontSize: 50
    },
})