import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import VerHistorialMedico from './VerHistorialMedico';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa la biblioteca de iconos que desees usar
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: {
          height: 80, // Ajusta la altura deseada
        },
        labelStyle: {
          fontSize: 16, // Ajusta el tamaño de la fuente deseado
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} /> // Cambia "home" al nombre del icono que desees
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} /> // Cambia "person" al nombre del icono que desees
          ),
        }}
      />
    </Tab.Navigator>
  );
}
