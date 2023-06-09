import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import Formulario from './src/screens/Formulario';
import Login from './src/screens/Login';
import Home from './src/screens/Home';

/*
FIJATE TENER INSTALADO ESTO PARA PODER NAVEGAR ENTRE PESTAÑAS!!
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
*/
const Stack = createStackNavigator();

const App = () => {
  // CAMBIAR headerShown: true POR False para esconder el navBar del componente
  //Linea 23
  return (
    <NavigationContainer fallback>
      <Stack.Navigator screenOptions={{ headerShown: true }}> 
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;