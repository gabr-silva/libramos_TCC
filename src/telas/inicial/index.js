import React, { useEffect } from "react";
import BotaoInicial from "../../components/BotaoInicio";
import { auth } from "../../config/firebase";

export default function Inicio({navigation}) {
useEffect(() =>{
    const estadoUsuario = auth.onAuthStateChanged(
        usuario => {
            if(usuario){
                navigation.replace('Modulo')
            }
        })
    return () => estadoUsuario();
}, [])

    return(
    <>
        <BotaoInicial onPress={() => navigation.navigate('Login')}>Login</BotaoInicial>
        <BotaoInicial onPress={() => navigation.navigate('Cadastro')}>Cadastro</BotaoInicial>
    </>
    )
}