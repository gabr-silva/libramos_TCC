import  React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import * as Progress from 'react-native-progress';

import { pontuacao, cameraLenta, palavras } from './script';
import style from './style_aula';

export default function Aula(){

    const video = React.useRef(null);
    const [score, setScore] = useState(0);
    const [vel, setVel] = useState(1)
    const [alternativas, setAlternativas] = useState([])
    const [cor, setCor] = useState(['blue'])
    const [resposta, setResposta] = useState([])

const Resposta = (escolha) => {
    if (resposta.includes(escolha)) {
      const AtualizarResposta = resposta.filter((item) => item !== escolha);
      
     setResposta(AtualizarResposta);
    } else {
      const AtualizarResposta = [...resposta, escolha];
      setResposta(AtualizarResposta);
    }
  };

    /*essa função faz com que o metodo setAlternativas seja chamado 
    ao iniciar o ciclo de vida da tela
    */
    useState(() => {
        setAlternativas(palavras());
      });

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


                {/*Campos onde fica as alternativas */}
                <View style={style.footer}>

                    <TouchableOpacity onPress={() => Resposta(alternativas[0])} style={style.button}>
                    <Text style={style.botaoAlternativas}>{alternativas[0]}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => pontuacao(score, setScore)} style={style.button}>
                    <Text style={style.botaoAlternativas}>{alternativas[1]}</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.footer}>
                    <TouchableOpacity onPress={() => pontuacao(score, setScore)} style={style.button}>
                    <Text style={style.botaoAlternativas}>{alternativas[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pontuacao(score, setScore)} style={style.button}>
                    <Text style={style.botaoAlternativas}>{alternativas[3]}</Text>
                    </TouchableOpacity>
                </View>
                
                
                <View>
                    <TouchableOpacity>
                        <Text style={style.btnConfirmar}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </>
}