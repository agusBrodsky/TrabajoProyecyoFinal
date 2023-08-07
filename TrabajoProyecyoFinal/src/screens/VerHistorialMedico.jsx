import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';

import NavBar from '../components/NavBar';

const VerHistorialMedico = () => {
  return (
    <View style={styles.container}>
      <NavBar textoInicio='Historial Medico' />
      <Image style={styles.claseLogo} source={Logo} />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => console.log('Botón Menor presionado')}>
            <Text style={styles.buttonText}>Menor</Text>
          </TouchableOpacity>
          <Text style={styles.claseTexto}>Mayo</Text>
          <TouchableOpacity onPress={() => console.log('Botón Mayor presionado')}>
            <Text style={styles.buttonText}>Mayor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divMedio}>
          <Text>Hola, soy el div del medio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  claseTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  claseLogo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.04,
    zIndex: 1,
  },
  divMedio: {
    width: '30%',
    height: '60%',
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: '70%', // Adjust this value to control the distance from the new container
    marginTop: 20, // Add margin top to create space between the containers
  },
});

export default VerHistorialMedico;
