import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { auth } from '../../config/firebase';

import AulaConcluida from '../../components/aula/AulaConcluida';
import AvançarBarra from '../../components/aula/AvançarBarra';
import GameOver from '../../components/aula/GameOver';
import DuasEscolha from '../../components/aula/telas/telaDuasAlter';
import MultiplaAlternativas from '../../components/aula/telas/telaMultipla';
import { AumentarBarra, PegarAula, PegarFrequencia } from '../../servicos/firestore';
import { cameraLenta, pontuacao } from './script_aula';
import style from './style_aula';

import CoracaoIcone from '../../../assets/img/icone-coracao.png';
import XIcone from '../../../assets/img/icone-x.png';

export default function Aula ({navigation, route}){

    const usuario = auth.currentUser;
    const {id_modulo} = route.params
    const [score, setScore] = useState(0);
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('#45aaf2');
    const [licao, setLicao] = useState(0);

    const [conteudos, setConteudos] = useState ([])

    const [botaoDuasEscolha, setBotaoDuasEscolha] = useState(null)

    const [opcoes, setOpcoes] = useState([])
    const [opcoesSelecionadas, setOpcoesSelecionadas] = useState([])
    const [ponto, setPonto] = useState(false)
    const [vida, setVida] = useState(3)
    const [modalVisivel, setModalVisivel] = useState(false)


    const AvancarLicao = () => {
        setBotaoDuasEscolha(null),
        setOpcoes([])
        setOpcoesSelecionadas([])
        setLicao((prevIndex) => (prevIndex + 1) % conteudos.length)
    }

    useEffect(() => {
        PegarAula(conteudos, setConteudos);
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
                <TouchableOpacity onPress={() => navigation.navigate('Modulos')}>
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
                        case 1:
                            return (
                                <MultiplaAlternativas
                                key={index}
                                vel={vel}
                                urlvideo={conteudo.video}
                                resposta={conteudo.resposta}
                                opcoes={opcoes}
                                opcoesSelecionadas={opcoesSelecionadas}
                                setOpcoes={setOpcoes}
                                setOpcoesSelecionadas={setOpcoesSelecionadas}
                                ></MultiplaAlternativas>
                            )
                        case 2:
                            return (
                                <DuasEscolha
                                key={index}
                                vel = {vel}
                                urlvideo={conteudo.video}
                                pergunta={conteudo.pergunta}
                                botaoDuasEscolha={botaoDuasEscolha}
                                setBotao={setBotaoDuasEscolha}
                                ></DuasEscolha>
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
                        botaoDuasEscolha
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
        </SafeAreaView>
    </>    
}