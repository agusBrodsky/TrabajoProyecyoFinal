import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity,ScrollView } from 'react-native';
import Logo from '../../assets/logo.png';
import Pregunta from '../components/Pregunta';
import NavBar from '../components/NavBar';
import axios from 'axios';

const VerHistorialMedico = () => {
  const [preguntas, setPreguntas] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta')
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);



  return (
    <View style={styles.container}>
      <NavBar textoInicio="Historial Medico" />
      <Image style={styles.claseLogo} source={Logo} />
      <ScrollView contentContainerStyle={styles.divMedio}>
        <Text style={styles.claseTextoDivMedio}>SELECCIONE EL NUMERO PARA MAS INFORMACION!</Text>
        {preguntas.map((preguntita) => (
          <Pregunta key={preguntita.Id} numAsk={preguntita.Id} ask={preguntita.Texto} />
        ))}
      </ScrollView>
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
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.04,
    zIndex: 1,
  },
  divMedio: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
    flexDirection: 'column', // Set the flexDirection to column for vertical arrangement
    justifyContent: 'flex-start', // Align the elements at the top of the divMedio
    overflow:'scroll'
  },
  button: {
    flexDirection: 'row', // Arrange the elements horizontally
    justifyContent: 'center', // Align the elements in the center horizontally
    alignItems: 'center', // Align the elements in the center vertically
  },
});

export default VerHistorialMedico;
