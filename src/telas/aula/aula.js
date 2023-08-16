import  React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Button} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import * as Progress from 'react-native-progress';

import { pontuacao, cameraLenta, palavras} from './script_aula';
import BotaoResposta from '../components/Botaoresposta';
import style from './style_aula';

const Aula = ({navigation}) => {

    const video = React.useRef(null);
    const [score, setScore] = useState(0);
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('blue');

    const [palavraCorreta, setPalavraCorreta] = useState('Qual o seu nome?')
    const [opcoes, setOpcoes] = useState([])
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([])
    const [ponto, setPonto] = useState(false)
    const [ModalVisivel, setModalVisivel] = useState('')

    /*essa função faz com que o metodo setAlternativas seja chamado 
    ao iniciar o ciclo de vida da tela
    */

    useEffect(() => {
        setOpcoes(palavras(palavraCorreta));
      }, []);

    return <>
    <View style={style.topo}>
    </View>
            {/* Topo da tela onde fica o horário, bateria etc */}
            <Text style={style.barraIni}></Text>
        <View style={style.fundo}>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => navigation.navigate('Modulos')}>
                    <Text style={{fontSize:20, color: 'white'}}>X</Text>
                </TouchableOpacity>
             <Progress.Bar progress={score} width={400} height={15}/>
            </View>
      <Text>O que significa esse sinal?</Text>
            {/* função de video */}
            <Video
                ref={video}
                source={{ uri: 'https://asana-user-private-us-east-1.s3.us-east-1.amazonaws.com/assets/1204295688699781/1205281492626818/9ca6c33948790f831b359c76540031a3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAV34L4ZY4PKXEGDNO%2F20230816%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230816T002022Z&X-Amz-Expires=120&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDiQ41w818LKSZUKlPovQeNtFG6QUUKBX3WYY4P7wz3FwIhAPFvavt2yolm52mCoFRk6NVYT4rLKqpCVktVumQS4KOsKrEFCFEQABoMNDAzNDgzNDQ2ODQwIgwFpipyGqbrMEzm%2F7gqjgWKyBhKVW74ZhpXFB8XEgCLqMgByLmgfF7hZklTOI%2F1FnjKLAafrYx%2B1nYoj0lOtj3yAnAhb3mbw32hHtIKW%2FOvK8mvsldYfTcMFycx2%2FrrF5IkhyvmfS1MuhDqqA3YEYAxXH1oigREMEIUXEuudwF628wl9PUhgFKUXpa6bmkEgs7qG1MPcst83sJRBsGP7x%2F9PSos2%2BiP3sjPCEKKIfZk7YIyxr6F8Eb24xbYrIuASja2Jj6g0qm5dHiyXpUguxyYzG%2F2yw7w3nQ6Gu2mT8JvOI%2B6A6yJ3SbelpTXOBgo0iiTAl8qvCUYTQqTJEQuX1IutYKdJe3tO4BiGy72r5nOqPaFkI%2FGqH6JZmRbOyZr6t%2BF%2FX%2FesNhINckDZ5a%2FJLEjpl9u%2FXl04ajJbuMsfn4%2FgbXCAx42gG2gT0p4%2FEtlAU5WpxKQKVseqSVZ8e7dcjSvXoWrbXswsf%2FfgPG%2F%2FtFg%2BVXNIM02CW1mU665FVB%2BcqvVhFfDiC0ta6iRYWok1Gxz6iJtpL%2FY%2FcaRJAwgUCG3qCCCsIuiED2S%2BY50gkujcc6z6AmiyF5y77WXTGDq7Mjrz%2BbrMelqxInr8mcQMRmvD1CXin%2FH5pKczL6fXzxwgeT1K%2B8CoqRcmeqbts%2B2tUnne8UhryF4oTjt6rOIJj8jmuau0AmoNi4PZguUeJqZFH6YuFJ5ZWV7gYKeooZuT377CxBtHIZ3Kcu3yBFOKTftYzkCyD7681YZLKUEltEsqOVdpUF7a8CMvqRrMRN694dD4yBum%2FgeUKHsGHCjLqVF2YLfZ2sTXoRrTsO5dG4nEsJEeN%2FoCrfgBFG37henx2PQG2MjqDoZxFnfocQ1iJl5U7Ee%2Fti9N%2F79wuQ4VqowwZTwpgY6sAFEzkAVdgv2mE5rN60JxAGuxa%2FMcNhhX8WQ0Zc%2BlJsHSHIzHspCluoaJL9Va13S7ozHctgUa2wahOHw9i5x3%2FdX%2BQw0%2FKyqqe1N1CO%2FNfR9yZ6PDhf1Nwc%2BzGFVR3ebjKnO3YTPhvrON5qiGfb391IcXUaRUYkae5EoTVkY%2B086e708xmi19DiWoecFE9%2BNmvPJDfkIu3uwYgcH%2BK8CHVQ66E2fzNnA%2FTKgbkiVu%2BFBYA%3D%3D&X-Amz-Signature=4c4074a5d927ea2d734bc2f2f3db54286f870fe85673f03a87e9702da67fadb3&X-Amz-SignedHeaders=host&x-id=GetObject#_=_' }}
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


            {/*campo onde fica o testo que o usuario clicou*/}
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


                {/* Campo botao confirmar*/}
                <View>
                    <TouchableOpacity
                    onPress={() => {pontuacao(score, setScore, opcoesSelecionadas, setPonto), setModalVisivel(!ModalVisivel)}}
                    >
                        <Text style={style.btnConfirmar}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
                
                <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisivel}
                onRequestClose={() => {
                    setModalVisivel(!ModalVisivel);
                }}>
                   <View style={style.modalContainer}>            
                        {/* Texto */}
                        <Text style={style.modalTexto}>
                            {ponto}
                        </Text>

                        {/* Botão */}
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisivel(!ModalVisivel);
                            }}
                        >
                            <Text style={style.ModalBotaoFechar}>{"->"}</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>

            </View>
    </>
}

export default Aula