import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, View } from 'react-native';

import Cadastro from '../Cadastro';
import Dicionario from '../Dicionario/index';
import Loja from '../Loja';
import Perfil from '../Perfil/index';
import Ranking from '../Ranking/index';
import Aula from '../aula/index';
import Inicio from '../inicial';
import Login from '../login';
import Menu from '../modulos/index';
import RedefSenha from '../redefSenha';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomTabBarIcon({ iconName, focused }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={iconName}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          marginTop: 5
        }}
      />
    </View>
  );
}

function ModuloTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Modulos') {
            iconName = focused
              ? require('../../../assets/img/icone-modulos-ativo.png')
              : require('../../../assets/img/icone-modulos-inativo.png');
          } else if (route.name === 'Ranking') {
            iconName = focused
              ? require('../../../assets/img/icone-modulos-ativo.png')
              : require('../../../assets/img/icone-modulos-inativo.png');
          } else if (route.name === 'Dicionario') {
            iconName = focused
              ? require('../../../assets/img/icone-modulos-ativo.png')
              : require('../../../assets/img/icone-modulos-inativo.png');
          } else if (route.name === 'Loja') {
            iconName = focused
              ? require('../../../assets/img/icone-modulos-ativo.png')
              : require('../../../assets/img/icone-modulos-inativo.png');
          }

          return (
            <CustomTabBarIcon iconName={iconName} focused={focused} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        tabStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Modulos"
        component={Menu}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Dicionario"
        component={Dicionario}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Loja"
        component={Loja}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}

function rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="RedefSenha" component={RedefSenha} options={{ headerShown: false }} />
        <Stack.Screen name="Modulo" component={ModuloTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Aula" component={Aula} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default rotas;
