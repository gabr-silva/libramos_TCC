import  React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import * as Progress from 'react-native-progress';

import { pontuacao, cameraLenta, palavras} from './script_aula';
import BotaoResposta from '../components/Botaoresposta';
import style from './style_aula';

const Aula = () => {

    const video = React.useRef(null);
    const [score, setScore] = useState(0);
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState(['blue']);

    const [opcoes, setOpcoes] = useState([])
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([])

    /*essa função faz com que o metodo setAlternativas seja chamado 
    ao iniciar o ciclo de vida da tela
    */

    useEffect(() => {
        setOpcoes(palavras());
      }, []);

      useEffect(() => {
        console.log("Array alternativas:", opcoesSelecionadas);
    }, [opcoesSelecionadas]);

    return <>
    <View style={style.topo}>
    </View>
            {/* Topo da tela onde fica o horário, bateria etc */}
            <Text style={style.barraIni}></Text>
        <View style={style.fundo}>
            <View>
             <Progress.Bar progress={score} width={400} height={15}/>
            </View>

            {/* função de video */}
            <Video
                ref={video}
                source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                resizeMode={ResizeMode.CONTAIN}
                style={style.video}
                shouldPlay = {true}
                isLooping = {true}
                isMuted = {true}
                rate={vel} //rate para acelerar e diminuir velocidade do video
            />

            {/* botao para fazer o video ficar em camera lenta */}
                <View>
                    <TouchableOpacity
                        style={[style.botaoVel, {backgroundColor: cor}]}
                        onPress={() => cameraLenta(vel, setCor, setVel)} //função para diminuir a velocidade do video e mudar a cor do botao
                    >
                        <Text style={style.botaoTexto}>cameraLenta</Text>
                    </TouchableOpacity>
                </View>


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
                <View>
                    <TouchableOpacity
                    onPress={() => pontuacao(score, setScore, opcoesSelecionadas)}
                    >
                        <Text style={style.btnConfirmar}>Confirmar</Text>
                    </TouchableOpacity>
                </View>

            </View>
    </>
}

export default Aula