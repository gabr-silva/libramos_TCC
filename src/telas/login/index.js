import React, { useState } from "react";
import { View, TouchableOpacity, Text, CommonActions } from "react-native";
import { EntradaTexto } from "../../components/EntradaTexto";
import { logar, redefinirSenha } from "../../servicos/requisicoes";
import { auth } from "../../config/firebase";
import { Alerta } from "../../components/Alerta";

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    async function realizarLogin() {
        if(email == ''){
            setMensagemError('O email é obrigatório');
            setStatusError('email')
          } else if(senha == ''){
            setMensagemError('A senha é obrigatória');
            setStatusError('senha')
          } else {
            const resultado = await logar(email, senha)
            if (resultado == 'erro'){
                setStatusError('firebase')
                setMensagemError('email ou senha incorreta')
            }else{
                navigation.reset({
                    index: 0, // Define o índice da rota que deve ser exibida após o reset
                    routes: [{ name: 'Modulo' }], // Define a rota de destino após o reset
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
            <EntradaTexto
                label="Senha"
                value={senha}
                onChangeText={texto => setSenha(texto)} 
                secureTextEntry
                error={statusError == 'senha'}
                messageError={mensagemError}
            />

            <Alerta mensagem={mensagemError} error={statusError == 'firebase'}
            setError={setStatusError}/>
                
            <TouchableOpacity onPress={() => realizarLogin()}>
                <Text>Logar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("RedefSenha")}>
            <Text>Redefinir senha</Text>
            </TouchableOpacity>
        </View>
    )
}