import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import GravityScreen from './screens/GravityScreen';
import FrequenciaScreen from './screens/FrequenciaScreen';
import AcelerometroScreen from './screens/AcelerometroScreen'; // Importe a nova tela

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Gravity" component={GravityScreen} options={{ title: 'Gravidade' }} />
        <Stack.Screen name="Frequencia" component={FrequenciaScreen} options={{ title: 'Frequência' }} />
        <Stack.Screen name="Acelerometro" component={AcelerometroScreen} options={{ title: 'Acelerômetro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;