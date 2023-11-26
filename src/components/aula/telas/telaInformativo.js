import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

import {ResizeMode, Video } from 'expo-av';

export default function Informativo ({vel, urlvideo, conteudo,}){

    const video = React.useRef(null);

    return <>
        <View>
            <Text style={style.texto}>{conteudo}</Text>
            {/* função de video */}
            <Video
                ref={video}
                source={{ uri:  urlvideo}}
                resizeMode={ResizeMode.CONTAIN}
                style={style.video}
                shouldPlay = {true}
                isLooping = {true}
                isMuted = {true}
                rate={vel} //rate para acelerar e diminuir velocidade do video
            />
        </View>                
    </>
}

export const style = StyleSheet.create({
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
});