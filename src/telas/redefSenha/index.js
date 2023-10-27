import React, { useState } from "react";
import { View, TouchableOpacity, Text, CommonActions } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { redefinirSenha } from "../../servicos/requisicoes";
import { auth } from "../../config/firebase";
import { Alerta } from "../../components/Alerta";

export default function RedefSenha({navigation}) {
    const [email, setEmail] = useState('');
    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    async function redefinicaoSenha() {
        if(email == ''){
            setMensagemError('O email é obrigatório');
            setStatusError('email')
        } else {
            const resultado = await redefinirSenha(email)
            if(resultado === "sucesso"){
                setEmail('')    
                }else{
                    navigation.reset({
                        index: 0, // Define o índice da rota que deve ser exibida após o reset
                        routes: [{ name: 'Inicio' }], // Define a rota de destino após o reset
                    });
                }
        }
    }

    return (
        <View>
            <EntradaTexto
                label="E-mail"
                value={email}
                onChangeText={texto => setEmail(texto)}
                error={statusError == 'email'}
                messageError={mensagemError}
            />
            
            <TouchableOpacity onPress={() => redefinicaoSenha()}>
            <Text>Redefinir senha</Text>
            </TouchableOpacity>
        </View>
    )
}