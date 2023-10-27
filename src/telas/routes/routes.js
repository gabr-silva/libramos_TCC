import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

//telas de navegação
import Cadastro from '../Cadastro';
import Dicionario from '../Dicionarios/index';
import Mascote from '../Mascote/index';
import Perfil from '../Perfil/index';
import Ranking from '../Ranking/index';
import Aula from '../aula/index';
import Inicio from '../inicial';
import Login from '../login';
import Menu from '../modulos/index';
import RedefSenha from '../redefSenha';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ModuloTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Modulos" component={Menu} options={{ headerShown: false }}/>
        <Tab.Screen name="Dicionario" component={Dicionario} options={{ headerShown: false }}/>
        <Tab.Screen name="Mascote" component={Mascote} options={{ headerShown: false }}/>
        <Tab.Screen name="Ranking" component={Ranking} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }
  
  function rotas() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }}/>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="RedefSenha" component={RedefSenha} options={{ headerShown: false }}/>
          <Stack.Screen name="Modulo" component={ModuloTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Aula" component={Aula} options={{ headerShown: false }}/>
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default rotas;