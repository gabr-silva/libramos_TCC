import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { auth } from '../../config/firebase';

import AulaConcluida from '../../components/aula/AulaConcluida';
import AvançarBarra from '../../components/aula/AvançarBarra';
import GameOver from '../../components/aula/GameOver';
import DuasEscolha from '../../components/aula/telas/telaDuasAlter';
import Informativo from '../../components/aula/telas/telaInformativo';
import MultiplaAlternativas from '../../components/aula/telas/telaMultipla';
import ModalConfirmacao from '../../components/modulos/modal';
import { PegarAula, PegarFrequencia } from '../../servicos/firestore';
import { cameraLenta, pontuacao } from './script_aula';
import style from './style_aula';

import CoracaoIcone from '../../../assets/img/icone-coracao.png';
import iconeSeta from '../../../assets/img/icone-seta.png';
import XIcone from '../../../assets/img/icone-x.png';
import iconeLento from '../../../assets/img/icone_lento.png';


export default function Aula ({navigation, route}){
    const usuario = auth.currentUser;
    const {id_modulo} = route.params
    const [carregamento, setCarregamendo] = useState(true);

    const [score, setScore] = useState(0);
    const [xpBarra, setXpBarra] = useState(0)
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('#45aaf2');
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
                    <Image source={XIcone} style={style.iconeX} />
                </TouchableOpacity>

                <View style={style.barraProgresso}>
                <Progress.Bar
                progress={score}
                width={285}
                height={10}
                unfilledColor='#fff'
                borderRadius={20}
                borderWidth={1}
                borderColor='#d2dae2'
                color="#45aaf2" // Cor da barra de progresso
                />
                </View>
                <View style={{flexDirection: 'column',}}>
                    <Image source={CoracaoIcone} style={style.iconeCoracao} />
                    <Text style={style.textoVidas}>{vida}</Text>
                </View>
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
            
            <View style={style.containerCamLenta}>
                <TouchableOpacity
                    onPress={() => cameraLenta(vel, setCor, setVel)} //função para diminuir a velocidade do video e mudar a cor do botao
                    
                >
  

                    <View style={style.circuloIconeLento}>
                    <Image source={iconeLento} style={style.iconeLento} />
                    </View>
                    <Text style={style.textoLento}>Velocidade</Text>

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

                    <View style={style.iconeConfirmarContainer}>
                    <Image source={iconeSeta} style={style.iconeConfirmar} />
                    </View>
                    <Text style={botaoConfirmar ? style.textoBotaoAtivo : style.btnInativo}>Continuar</Text>

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