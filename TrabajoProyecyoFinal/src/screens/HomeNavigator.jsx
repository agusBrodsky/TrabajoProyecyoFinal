import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Perfil from './Perfil';
import VerHistorialMedico from './VerHistorialMedico';
import Editar from './Editar';
import Agenda from './Agenda'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        style: {
          height: 80,
        },
        labelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="date-range" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerHistorialMedico"
        component={VerHistorialMedico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editar"
        component={Editar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
)}
