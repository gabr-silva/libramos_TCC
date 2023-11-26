import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palavras } from '../../../telas/aula/script_aula';
import BotaoResposta from '../../Botaoresposta';

import { ResizeMode, Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function MultiplaAlternativas({urlvideo, vel, opcoes, opcoesSelecionadas, setOpcoes, setOpcoesSelecionadas}) {

    const video = React.useRef(null)

    const embaralharAltern = (alternativas) => {
    
        for (let i = alternativas.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]]; 
        }
        const novaLista = alternativas
        return novaLista
    }

    useEffect(() => {
        setOpcoes(embaralharAltern(opcoes));
      }, []);

    return<>
        <SafeAreaView style={style.container}>
            <View>
                <Text>O que significa esse sinal?</Text>
                {/* função de video */}
                <Video
                    ref={video}
                    source={{ uri:  urlvideo}}
                    resizeMode={ResizeMode.CONTAIN}
                    style={style.video}
                    shouldPlay = {true}
                    isLooping = {true}
                    isMuted = {true}
                    rate={vel}
                />
    
    
                {/*campo onde fica o texto que o usuario clicou*/}
                <View style={style.selecaoOpcao}>
                    <Text>{opcoesSelecionadas.join(' ')}</Text>
                </View>

                {/*Campos onde fica as alternativas */}
                <View style={style.footer}>
                    <BotaoResposta
                    escolha={opcoes[0]}
                    alternativa={opcoesSelecionadas}
                    setAlternativa={setOpcoesSelecionadas}/>

                    <BotaoResposta
                    escolha={opcoes[1]}
                    alternativa={opcoesSelecionadas}
                    setAlternativa={setOpcoesSelecionadas}/>
                </View>
                <View style={style.footer}>
                    <BotaoResposta escolha={opcoes[2]}
                    alternativa={opcoesSelecionadas}
                    setAlternativa={setOpcoesSelecionadas}/>

                    <BotaoResposta escolha={opcoes[3]}
                    alternativa={opcoesSelecionadas}
                    setAlternativa={setOpcoesSelecionadas}/>
                </View>            
            </View>
        </SafeAreaView>
        </>
}

export const style = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopColor: '#ccc',
    },
    botaoAlternativas: {
        backgroundColor: '#4285F4',
        padding: 10,
        width: 150,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 20,
    },
    selecaoOpcao:{
        width: "100%",
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 20,
    },
});