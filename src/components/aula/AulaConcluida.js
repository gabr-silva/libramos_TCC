import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AulaConcluida = ({ modalVisivel, onClose, navigation }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={onClose}>
            <View style={style.Container}>
                {/* Texto */}
                <Text style={style.Texto}>
                   Aula concluída, PARABÉNS!
                </Text>

                {/* Botão */}
                <TouchableOpacity onPress={() => navigation.navigate('Modulos')}>
                    <Text style={style.BotaoFechar}>OK</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const style = StyleSheet.create({
     Container:{
        backgroundColor: '#303049',
        width: 342,
        height: 60,
        top: 600,
        left: 20,
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

export default AulaConcluida;