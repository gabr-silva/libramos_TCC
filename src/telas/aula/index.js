import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { auth } from '../../config/firebase';

import AulaConcluida from '../../components/aula/AulaConcluida';
import AvançarBarra from '../../components/aula/AvançarBarra';
import GameOver from '../../components/aula/GameOver';
import Informativo from '../../components/aula/telas/telaInformativo';
import MultiplaAlternativas from '../../components/aula/telas/telaMultipla';
import ModalConfirmacao from '../../components/modulos/modal';
import { AumentarBarra, PegarAula, PegarFrequencia } from '../../servicos/firestore';
import { cameraLenta, pontuacao } from './script_aula';
import style from './style_aula';

import CoracaoIcone from '../../../assets/img/icone-coracao.png';
import XIcone from '../../../assets/img/icone-x.png';

export default function Aula ({navigation, route}){

    const usuario = auth.currentUser;
    const {id_modulo} = route.params
    const [score, setScore] = useState(0);
    const [xpBarra, setXpBarra] = useState(0)
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('#45aaf2');
    const [licao, setLicao] = useState(0);

    const [conteudos, setConteudos] = useState ([])

    const [botaoDuasEscolha, setBotaoDuasEscolha] = useState(null)

    const [opcoes, setOpcoes] = useState([])
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([])
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
        setLicao((prevIndex) => (prevIndex + 1) % conteudos.length)
    }

    useEffect(() => {
        PegarAula(setXpBarra, setConteudos, id_modulo);
      }, []);

      useEffect(() => {
        // Chame a função PegarFrequencia quando o score for alterado
        if (vida >= 0 && Math.abs(score - 1) < 0.0001) {
          PegarFrequencia(usuario, 2);
          AumentarBarra(usuario, id_modulo)
        }
      }, [score, vida]);

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
                        
                        case "Pergunta":
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
                        case 'Informativo':
                            return (
                                <Informativo
                                key={index}
                                vel={vel}
                                urlvideo={"https://drive.google.com/uc?id=15HD1VaJ9csa6QQXCvq8aaJgFuwGAM3Ti"}
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
                        xpBarra
                    );} setModalVisivel(!modalVisivel)}}
                >
                    <Text style={style.btnConfirmar}>Confirmar</Text>
                </TouchableOpacity>

                {/* Componente para verificar quantas vidas o usúario tem*/}
                {vida < 0 ? (
                        <GameOver
                            modalVisivel={modalVisivel}
                            onClose={() => setModalVisivel(false)}
                            navigation={navigation}
                        />
                    ) : vida >= 0 && Math.abs(score - 1) < 0.0001 ?(
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