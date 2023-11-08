import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import HomeNavigator from './src/screens/HomeNavigator';
import Formulario from './src/screens/Formulario';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import VerHistorialMedico from './src/screens/VerHistorialMedico';
import Perfil from './src/screens/Perfil';
import Home from './src/screens/Home';
import NavBar from './src/components/NavBar'; // Importa tu componente NavBar
import Editar from './src/screens/Editar';
import Agenda from './src/screens/Agenda';

/*
FIJATE TENER INSTALADO ESTO PARA PODER NAVEGAR ENTRE PESTAÑAS!!
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
*/
const Stack = createStackNavigator();

const handleBackPress = () => {
  console.log("Volvimos para aca")
}
const App = () => {
  return (

    <NavigationContainer fallback>
      <Stack.Navigator>

        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            header: ({ navigation }) => <NavBar title="Home" onBackPress={handleBackPress} />,
          }}
        />
      <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: ({ navigation }) => <NavBar title="Home" onBackPress={handleBackPress} />,
          }}
        />
        
      
        <Stack.Screen
          name="Formulario"
          component={Formulario}
          options={{
            header: ({ navigation }) => <NavBar navigation={navigation} title="Formulario" />,
          }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{
            header: ({ navigation }) => <NavBar navigation={navigation} title="Perfil" />,
          }}
        />
        <Stack.Screen
          name="VerHistorialMedico"
          component={VerHistorialMedico}
          options={{
            header: ({ navigation }) => <NavBar navigation={navigation} title="VerHistorialMedico" />,
          }}
        />
        
        {/* Elimina HomeNavigator de las pantallas de Login y Register */}
        <Stack.Screen name="Register" component={Register} options={{ headerShown: true }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
