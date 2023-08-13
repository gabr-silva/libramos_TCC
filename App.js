import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuTab from './src/telas/routes/menuRotas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuTab />
  );
}