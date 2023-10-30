import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import Home from './src/screens/HomeNavigator';
import Formulario from './src/screens/Formulario';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import VerHistorialMedico from './src/screens/VerHistorialMedico';
import Perfil from './src/screens/Perfil';

/*
FIJATE TENER INSTALADO ESTO PARA PODER NAVEGAR ENTRE PESTAÑAS!!
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
*/
const Stack = createStackNavigator();

const App = () => {
  // CAMBIAR headerShown: true POR False para esconder el navBar del componente
  //Linea 25
  return (
    <NavigationContainer fallback>

      <Stack.Navigator screenOptions={{ headerShown: false }}>     
      <Stack.Screen name="Home" component={Home} /> 
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Login" component={Login} />   
        <Stack.Screen name="Register" component={Register} />    
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="VerHistorialMedico" component={VerHistorialMedico} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;