import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';
import Pregunta from '../components/Pregunta';
import NavBar from '../components/NavBar';

const VerHistorialMedico = () => {
  
  return (
    <View style={styles.container}>
      <NavBar textoInicio='Historial Medico' />
      <Image style={styles.claseLogo} source={Logo} />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => console.log('Botón Menor presionado')}>
              <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.claseTexto}>Mayo</Text>
            <TouchableOpacity onPress={() => console.log('Botón Mayor presionado')}>
              <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divMedio}>
          <Text style={styles.claseTextoDivMedio}>SELECCIONE EL NUMERO PARA MAS INFORMACION!</Text>
          <Pregunta ask={"Pregunta Numero 3"} />
          <Pregunta ask={"Pregunta Numero 2"}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  claseTextoDivMedio:{
    fontSize:12,
    margin:10,
    textAlign:'center',
    fontWeight:'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 0, // Add margin bottom to create space between the buttonContainer and the divMedio
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  claseTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  claseLogo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.04,
    zIndex: 1,
  },
  divMedio: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20, // Adjust this value to control the distance from the buttonContainer
  },
  button: {
    flexDirection: 'row', // Arrange the elements horizontally
    justifyContent: 'center', // Align the elements in the center horizontally
    alignItems: 'center', // Align the elements in the center vertically
  },
});

export default VerHistorialMedico;
