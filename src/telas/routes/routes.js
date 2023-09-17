import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//telas de navegação
import Inicio from '../inicial';
import Cadastro from '../Cadastro';
import Login from '../login';
import Menu from '../Modulos/index'; 
import Aula from '../Aula/index';
import Dicionario from '../Dicionarios/index'
import Perfil from '../Perfil/index';
import Ranking from '../Ranking/index';
import Mascote from '../Mascote/index';

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
          <Stack.Screen name="Modulo" component={ModuloTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Aula" component={Aula} options={{ headerShown: false }}/>
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default rotas;