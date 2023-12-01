import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ResizeMode, Video } from 'expo-av';

export default function Informativo ({vel, urlvideo, conteudo,}){

    const video = React.useRef(null);

    return <>
        <View>
            <Text style={style.texto}>{conteudo}</Text>
            {/* função de video */}
            <View style={style.videoContainer}>
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
        </View>
    </>
}

export const style = StyleSheet.create({
    texto: {
        fontSize: 20,
        justifyContent: "flex-start",
        marginLeft: 20,
    },

    videoContainer: {
        width: 550,
        height: 450,
        overflow: 'hidden', // Certifique-se de que o conteúdo não ultrapasse as bordas do container
        marginTop: 30,
        alignSelf: 'center',
        bottom: 15
    },

    video: {
        width: '100%',
        height: '100%',
    },
});