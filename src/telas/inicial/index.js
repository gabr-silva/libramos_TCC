import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import BotaoInicial from "../../components/BotaoInicio";
import { auth } from "../../config/firebase";
import AnimacaoCarregando from '../../../assets/AnimacaoCarregando.gif'
import style from "./style";

export default function Inicio({navigation}) {
    const [carregando, setCarregando] = useState(true)

    useEffect(() =>{
        const estadoUsuario = auth.onAuthStateChanged(
            usuario => {
                if(usuario){
                    if(usuario.emailVerified){
                    navigation.replace('Modulo')
                    }
                }
                setCarregando(false)
            })
        return () => estadoUsuario();
    }, [])

    if (carregando) {
        return (
            <View style ={style.containerAnimacao}>
                <Image source ={AnimacaoCarregando} 
                    style={style.imagem}/>
            </View>
        )
    }
    return(
    <>
        <BotaoInicial onPress={() => navigation.navigate('Login')}>Login</BotaoInicial>
        <BotaoInicial onPress={() => navigation.navigate('Cadastro')}>Cadastro</BotaoInicial>
    </>
    )
}