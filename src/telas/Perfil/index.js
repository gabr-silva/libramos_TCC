import React from "react";
import { View, Text, Button } from "react-native";
import style from "./style";
import { auth } from "../../config/firebase";

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