import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//telas de navegação
import Menu from '../modulos/modulos'; // Certifique-se de que o caminho esteja correto
import Aula from '../aula/aula'; // Certifique-se de que o caminho esteja correto
import Dicionario from '../dicionarios/dicionarios'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ModuloTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Modulos" component={Menu} options={{ headerShown: false }}/>
        <Tab.Screen name="Dicionario" component={Dicionario} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }
  
  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Modulo" component={ModuloTabs} options={{ headerShown: false }}/>
          <Stack.Screen name="Aula" component={Aula} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;