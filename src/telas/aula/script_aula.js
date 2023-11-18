//Função de verificar resposta
export const pontuacao = (score, setScore, tipo, resposta,setPonto, vida,  setVida, opcoesSelecionadas, botaoDuasEscolha)=>{    

    switch (tipo) {
        case 1:
            const palavraResposta = opcoesSelecionadas.join(' ')
            if (palavraResposta === resposta) {
                setScore(score + 0.1);
                setPonto('Correto')
           } else {
               setPonto('Errado')
               setVida(vida - 1)
           } 
            break;
        case 2:
            if (botaoDuasEscolha === resposta) {
                setScore(score + 0.1);
                setPonto('Correto')
           } else {
               setPonto('Errado')
               setVida(vida - 1)
           } 
            break;
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
export const palavras = (palavraCorreta) => {

    listaPalavra = ["ola", "tchau" , "prazer", "alo", "tudo bem?", "até mais"]

    for (let i = listaPalavra.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [listaPalavra[i], listaPalavra[j]] = [listaPalavra[j], listaPalavra[i]]; 
    }
    const novaLista = listaPalavra.slice(0,3)
    const campoAlternativa = [...novaLista, palavraCorreta]
    return campoAlternativa
}
