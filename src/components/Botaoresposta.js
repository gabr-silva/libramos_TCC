import { Text, TouchableOpacity, StyleSheet} from 'react-native';

const BotaoResposta = ({ escolha, alternativa, setAlternativa }) => {
    const opcoesSelecionadas = (opcao) => {
      if (alternativa.includes(opcao)) {
        const atualizarResposta = alternativa.filter((item) => item !== opcao);
        setAlternativa(atualizarResposta);
      } else {
        const atualizarResposta = [...alternativa, opcao];
        setAlternativa(atualizarResposta);
      }
    };
    /*
    O que estiver dentro do retorno servira para o que sera mostrado e o que será feito por outro componente
    * 
    */
    return <>
        <TouchableOpacity onPress={() => opcoesSelecionadas(escolha)} style={[style.botaoAlternativas, 
        alternativa.includes(escolha) && style.selecionado]}> 
        <Text style={style.botaoTexto}>
            {escolha}
            </Text>
        </TouchableOpacity>
    </>
};

const style = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopColor: '#ccc',
    },
    botaoAlternativas: {
        backgroundColor: '#4285F4',
        padding: 10,
        width: 150,
        height: 50,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontSize: 15,
    },
    selecionado: {
       backgroundColor: 'green'
    }
    }
);

export default BotaoResposta;