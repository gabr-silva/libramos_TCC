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
            <View style={style.alternativas}> 
                <TouchableOpacity onPress={()=> clicarBotao("Sim")} 
                style={[botaoDuasEscolha == "Sim" ? style.selecionado : style.botao]}>
                    <Text>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clicarBotao("Nao")} 
                style={[botaoDuasEscolha == "Nao" ? style.selecionado : style.botao]}>
                    <Text>Nao</Text>
                </TouchableOpacity>
            </View>
        </View>                
    );
}

import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },
    texto: {
        textAlign: 'center'
    },
    video: {
        width: 300,
        height: 200,
        marginTop: 50,
        borderRadius: 10,
        marginHorizontal: 50
    },
    alternativas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 60,
    },
    botao: {
        backgroundColor: '#4285F4',
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
    },
    selecionado: {
        backgroundColor: 'red',
        padding: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
    }
});

