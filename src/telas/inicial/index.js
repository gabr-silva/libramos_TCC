import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AnimacaoCarregando from '../../../assets/AnimacaoCarregando.gif';
import { auth } from "../../config/firebase";
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
        <ImageBackground
        source={require('../../../assets/img/blue-gradient-bg.jpg')}
        style={style.container}>
        
        <View>
            <Image
            source={require("../../../assets/img/libramos-logotipo-amarelo.png")}l
            style={style.imgLogotipo}
            />
            <Text style={style.textoOnboarding}>
            O aplicativo para você aprender Libras de uma vez por todas!
            </Text>
        </View>


          <Image
            source={require("../../../assets/img/capivara-segurando-celular.png")}l
            style={style.imgCapivara}
          />            
          <TouchableOpacity style={style.botaoCadastro} onPress={() => navigation.navigate('Cadastro')} activeOpacity={0.8}>
            <Text style={style.textoBotaoCadastro}>Vamos lá!</Text>
          </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ marginTop: 20, marginBottom: 15, color: "#2359AF" }}>
              Já tem uma conta? <Text style={{ fontWeight: "bold", color: "#2359AF" }}>Faça o Login</Text>
            </Text>
          </TouchableOpacity>

    </ImageBackground>
    );
}