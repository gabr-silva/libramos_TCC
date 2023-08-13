import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//telas de navegação
import Menu from '../modulos/modulos'; // Certifique-se de que o caminho esteja correto
import Aula from '../aula/aula'; // Certifique-se de que o caminho esteja correto

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RotaMenu = () => {
    return (
        <Stack.Navigator initialRouteName='Menu'>
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
            <Stack.Screen name="Aula" component={Aula} options={{ tabBarVisible: false, headerShown:false }} />
        </Stack.Navigator>
    );
}

const MenuTab = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Modulos'>
                <Tab.Screen name="Modulos" component={RotaMenu} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


export default MenuTab;