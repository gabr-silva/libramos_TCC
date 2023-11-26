import React from "react";
import { Button, Text, View } from "react-native";
import { auth } from "../../config/firebase";
import style from "./style";

const Perfil = ({navigation}) => {
    const usuario = auth.currentUser;

    function deslogar(){
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Inicio' }],
          });
      };

    return (
        <View style={style.container}>
          <Text style={style.text}>Perfil do Usuário</Text>
          <Text style={style.text}>{usuario.email}</Text>
          <Button title="Logout" onPress={deslogar} />
        </View>
      );;
}

export default Perfil