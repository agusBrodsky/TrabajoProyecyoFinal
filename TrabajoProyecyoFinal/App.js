import React from 'react';
import { Text, TouchableNativeFeedback, View,Alert,StyleSheet } from 'react-native';
import NoUsopaginaLogin from './src/screens/NoUsopaginaLogin.jsx';
import Login from './src/screens/Login.jsx';
import Home from './src/screens/Home.jsx';
import Formulario from './src/screens/Formulario.jsx';
export default function App() {
  return <Formulario />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
