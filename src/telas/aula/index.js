import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, BackHandler, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';

import { auth } from '../../config/firebase';

import AulaConcluida from '../../components/aula/AulaConcluida';
import AvançarBarra from '../../components/aula/AvançarBarra';
import ModalConfirmacao from '../../components/modulos/modal';
import GameOver from '../../components/aula/GameOver';
import Informativo from '../../components/aula/telas/telaInformativo';
import DuasEscolha from '../../components/aula/telas/telaDuasAlter';
import MultiplaAlternativas from '../../components/aula/telas/telaMultipla';
import { PegarFrequencia, PegarAula } from '../../servicos/firestore';
import { cameraLenta, pontuacao } from './script_aula';
import style from './style_aula';

export default function Aula ({navigation, route}){
    const usuario = auth.currentUser;
    const {id_modulo} = route.params
    const [carregamento, setCarregamendo] = useState(true);

    const [score, setScore] = useState(0);
    const [xpBarra, setXpBarra] = useState(0)
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('blue');
    const [licao, setLicao] = useState(0);

    const [conteudos, setConteudos] = useState ([])

    const [botaoDuasEscolha, setBotaoDuasEscolha] = useState(null)

    const [opcoes, setOpcoes] = useState([])
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([])
    const [botaoConfirmar, setBotaoConfirmar] = useState()
    const [ponto, setPonto] = useState('')
    const [vida, setVida] = useState(3)
    const [modalVisivel, setModalVisivel] = useState(false)
    const [modalSair, setModalSair] = useState(false)

    const AbrirModal = () => {
       setModalSair(true)
     }

    const AvancarLicao = () => {
        setBotaoDuasEscolha(null),
        setOpcoes([])
        setOpcoesSelecionadas([])
        setBotaoConfirmar(false)
        setLicao((prevIndex) => (prevIndex + 1) % conteudos.length)
    }

    const RepetirLicao = () => {
        const arrayAula = [...conteudos]
        const aulaRepetida = conteudos[licao]
        arrayAula.push(aulaRepetida);

        setConteudos(arrayAula)
    }

    console.log(conteudos[licao]);

    useEffect(() => {
        const carregarAula = async () => {
            await PegarAula(setXpBarra, setConteudos, id_modulo);
            await new Promise(resolve => setTimeout(resolve, 2000));
            setCarregamendo(false)
        }

        carregarAula()
    }, []);

    useEffect(() => {
        const onPressVoltar = () => {
            if(modalSair){
                setModalSair(false)
            } else {
                setModalSair(true)
            }    
        }; 
    
        BackHandler.addEventListener('hardwareBackPress', onPressVoltar)

        return () => {BackHandler.removeEventListener('hardwareBackPress', onPressVoltar)}
    }, []);

    useEffect(() => {
        if (
            opcoesSelecionadas.length !== 0 ||
            botaoDuasEscolha !== null ||
            (conteudos.length > 0 && conteudos[licao] && conteudos[licao].tipo === 'Informativo')
        ) {
            setBotaoConfirmar(true);
        } else {
            setBotaoConfirmar(false);
        }
    }, [opcoesSelecionadas, botaoDuasEscolha, conteudos]);

    useEffect(() => {
        // Chame a função PegarFrequencia quando o score for alterado
        if (vida >= 0 && Math.abs(score - 1) < 0.001) {
            PegarFrequencia(usuario, 2, id_modulo);
        }
        }, [score, vida]);

    if(carregamento) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="blue" />
              <Text>Carregando...</Text>
            </View>
          );
    }
    return <>
        <SafeAreaView style={style.safeArea}>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => AbrirModal()}>
                    <Text style={{fontSize:40, color: 'white'}}>{"<-"}</Text>
                </TouchableOpacity>
                <Progress.Bar progress={score} width={300} height={20}/>
                <Text style={{backgroundColor: 'pink', fontSize: 20}}>{vida}</Text>
            </View>

            {conteudos.map((conteudo, index)=> {
                if(index === licao) {
                    switch (conteudo.tipo) {
                        case "pergunta_multipla":
                            return (
                                <MultiplaAlternativas
                                key={index}
                                vel={vel}
                                urlvideo={conteudo.video}
                                resposta={conteudo.resposta}
                                opcoes={conteudo.alternativas}
                                opcoesSelecionadas={opcoesSelecionadas}
                                setOpcoes={setOpcoes}
                                setOpcoesSelecionadas={setOpcoesSelecionadas}
                                ></MultiplaAlternativas>
                            )
                        case "pergunta_sim_nao":
                            return (
                                <DuasEscolha 
                                key={index}
                                vel={vel}
                                urlvideo={conteudo.video}
                                pergunta={conteudo.conteudo}
                                botaoDuasEscolha={botaoDuasEscolha}
                                setBotao={setBotaoDuasEscolha}
                                />
                            )
                        case 'Informativo':
                            return (
                                <Informativo
                                key={index}
                                vel={vel}
                                urlvideo={conteudo.video}
                                conteudo={conteudo.conteudo}
                                ></Informativo>
                            )                          
                    }
                } else {
                    return null;
                }
            })}
            
            <View style={style.conteinerCamLenta}>
                <TouchableOpacity
                    style={[style.botaoVel, {backgroundColor: cor}]}
                    onPress={() => cameraLenta(vel, setCor, setVel)} //função para diminuir a velocidade do video e mudar a cor do botao
                >
                    <Text style={style.botaoTexto}>cameraLenta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {if (conteudos[licao]) {
                    pontuacao(
                        score,
                        setScore,
                        conteudos[licao].tipo,
                        conteudos[licao].resposta,
                        setPonto,
                        vida,
                        setVida,
                        opcoesSelecionadas,
                        botaoDuasEscolha,
                        xpBarra,
                        RepetirLicao
                    );} setModalVisivel(!modalVisivel)}}
                    disabled={!botaoConfirmar}
                >
                    <Text style={botaoConfirmar ? style.btnAtivo : style.btnInativo}>Confirmar</Text>
                </TouchableOpacity>

                {/* Componente para verificar quantas vidas o usúario tem*/}
                {vida < 0 ? (
                        <GameOver
                            modalVisivel={modalVisivel}
                            onClose={() => setModalVisivel(false)}
                            navigation={navigation}
                        />
                    ) :vida >= 0 && Math.abs(score - 1) < 0.001 ? (
                        <AulaConcluida
                            modalVisivel={modalVisivel}
                            onClose={() => setModalVisivel(false)}
                            navigation={navigation}
                            usuario={usuario}
                        />
                    ) : (
                        <AvançarBarra
                            modalVisivel={modalVisivel}
                            onClose={() => setModalVisivel(false)}
                            ponto={ponto}
                            avançarLicao={AvancarLicao}
                        />
                    )}
            </View>
            {modalSair?(
                <ModalConfirmacao
                    texto={"Tem certeza de que deseja sair?"}
                    modalVisivel={modalSair}
                    onClose={() => setModalSair(false)}
                    tela={() => navigation.navigate("Modulo")}
                />
            ):null}
        </SafeAreaView>
    </>    
}