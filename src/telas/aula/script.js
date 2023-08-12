import React, {useState} from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//Função de verificaResposta
export const pontuacao = (score, setScore, opcoesSelecionadas)=>{ 

    
    const palavraResposta = opcoesSelecionadas.join(' ')
    
    if (palavraResposta === "Ola Qual o seu nome?") {
         setScore(score + 0.1);
    } else {
        console.log("Resposta errada")
    }
};

//função de mudança de velocidade de video
export const cameraLenta = (vel,  setcor, setVel)=>{
    if (vel === 1) {
        // se for igual a 1, define a nova velocidade para 0.5 e a cor para "red"
        setVel(0.5);
        setcor("red");
      } else {
        // se não, define a nova velocidade para 1 e a cor para "blue"
        setVel(1);
        setcor("blue");
      }
}

/*Função que fara a coleta de palavras em embaralhar a sua ordem em um Array
    Obs:Mudar futuramente para a coletar no BD a palavra que contem resposta e outras aleatórias
*/
export const palavras = () => {
        listaPalavra = ["Ola", "Tchau" , "Prazer", "Qual o seu nome?"]

        for (let i = listaPalavra.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [listaPalavra[i], listaPalavra[j]] = [listaPalavra[j], listaPalavra[i]]; 
        }
        return listaPalavra
}