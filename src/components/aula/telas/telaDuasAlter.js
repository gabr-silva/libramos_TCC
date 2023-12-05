import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function DuasEscolha ({vel, urlvideo, pergunta, botaoDuasEscolha, setBotao}){

    const video = React.useRef(null);

    const clicarBotao = (botao) => {
        if(botaoDuasEscolha == botao){
            setBotao(null)
        } else {
            setBotao(botao)
        }
    }

    return <>
        <View>
            <Text style={style.texto}>{pergunta}"</Text>
            {/* função de video */}
            <View style={style.videoContainer}>
            <Video
                ref={video}
                source={{ uri:  urlvideo}}
                resizeMode={ResizeMode.CONTAIN}
                style={style.video}
                shouldPlay={true}
                isLooping={true}
                isMuted={false}
                rate={vel} //rate para acelerar e diminuir velocidade do video
            />
            </View>

            <View style={style.alternativas}> 
                <TouchableOpacity onPress={()=> clicarBotao("Sim")} 
                style={[botaoDuasEscolha == "Sim" ? style.selecionado : style.botao]}>
                    <Text style={style.textoBotoes}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clicarBotao("Nao")} 
                style={[botaoDuasEscolha == "Nao" ? style.selecionado : style.botao]}>
                    <Text style={style.textoBotoes}>Não</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
}

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },

    texto: {
        fontSize: 20,
        justifyContent: "flex-start",
        marginLeft: 20,
    },

    videoContainer: {
        width: 500,
        height: 400,
        borderRadius: 10,
        overflow: 'hidden', // Certifique-se de que o conteúdo não ultrapasse as bordas do container
        marginTop: 30,
        alignSelf: 'center',
        bottom: 35,
    },

    video: {
        width: '100%', // Use '100%' para preencher todo o container
        height: '100%',
    },

    alternativas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 60,
        bottom: 40
    },

    botao: {
        backgroundColor: '#034FC9',
        padding: 10,
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    selecionado: {
        backgroundColor: '#034FC9',
        borderColor: '#7DEAF8',
        borderWidth: 5,
        elevation: 5,
        padding: 10,
        width: 100,
        height: 100,
        bottom: 4,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textoBotoes: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '500'
    },
});

