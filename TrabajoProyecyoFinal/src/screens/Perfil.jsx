import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Perfil() {
  const navigation = useNavigation();

  const goToHistorialMedico = () => {
    navigation.navigate('VerHistorialMedico'); 
  };
  const goToEditar = () => {
    navigation.navigate('Editar'); // Navega a la pantalla "Editar"
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.userName}>Nombre del Usuario</Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToHistorialMedico}
        >
          <Text style={styles.buttonText}>Ver Historial Médico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={goToEditar} 
        >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 175,
    height: 175,
    alignSelf: 'center',
    marginTop: 100,
  },
  navBar: {
    backgroundColor: "#03C4D0",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 100,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 160,
    marginTop: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 30
  },
  button: {
    backgroundColor: "#03C4D0",
    width: 250,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 10,
    bottom: 20
  },
  button2: {
    backgroundColor: "#03C4D0",
    width: 250,
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 10,
    bottom: 125 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
