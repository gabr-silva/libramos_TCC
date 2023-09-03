import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//telas de navegação
import Menu from '../modulos/modulos'; // Certifique-se de que o caminho esteja correto
import Aula from '../aula/aula'; // Certifique-se de que o caminho esteja correto
import Dicionario from '../dicionarios/dicionarios'
import Perfil from '../perfil/perfil';
import Ranking from '../ranking/ranking';
import Mascote from '../mascote/mascote';

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
          <Stack.Screen name="Modulo" component={ModuloTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Aula" component={Aula} options={{ headerShown: false }}/>
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default rotas;