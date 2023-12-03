import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import capivaraLagoa from '../../../assets/img/capivara-lagoa.png';
import iconeSeta from '../../../assets/img/icone-seta.png';

export default function AvancarAula({ modalVisivel, onClose, ponto ,avançarLicao }){
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
                        <Image source={iconeSeta} style={style.imgSeta} />
                        <Text style={style.BotaoFechar}>■</Text>
                        <Image source={capivaraLagoa} style={style.imgCapivara} />
                    </TouchableOpacity>
                </View>
            </Modal>);
};

const style = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        backgroundColor: '#408AED', 
        width: 365,
        height: 75,
        top: 640,
        left: 9,
        borderRadius: 30,
        alignItems: 'center',
        textAlign: 'center',
        elevation: 5
    },

    Texto: {
        fontSize: 34,
        textAlign: 'center',
        color: '#fff',
        left: 110,
        bottom: 3
    },

    BotaoFechar: {
        marginStart: 20,
        fontSize: 50,
        color: 'transparent', // Cor do botão de fechar (azul)
        left: 100
    },

    imgCapivara: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 8,
        right: 110
    },

    imgSeta: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 10,
        left: 150,
    },

})