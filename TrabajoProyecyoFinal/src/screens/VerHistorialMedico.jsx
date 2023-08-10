import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../../assets/logo.png';
import Pregunta from '../components/Pregunta';
import NavBar from '../components/NavBar';
import axios from 'axios';

const VerHistorialMedico = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta')
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);

  const cambiarMes = async (cambio) => {
    try {
      const fechaActual = new Date();
      const dia1 = "2022-03-1"; // Ajusta esto con la fecha de inicio que necesitas
      const dia2 = "2022-03-31"; // Ajusta esto con la fecha de fin que necesitas
      const idUsuario = 1;
  
      // Realizar la llamada a la API con axios 
      const response = await axios.get(`http://localhost:3000/Fecha/${dia1}/${dia2}/${idUsuario}`);
  
      // Aquí puedes manejar la respuesta de la API, por ejemplo, actualizando los datos en el estado
      console.log(response.data); // Esto mostrará la respuesta en la consola
  
    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
    }
  }

  return (
    <View style={styles.container}>
      <NavBar textoInicio="Historial Medico" />
      <Image style={styles.claseLogo} source={Logo} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => cambiarMes("menor")}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.claseTexto}>Mayo</Text>
          <TouchableOpacity onPress={() => cambiarMes("mayor")}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </TouchableOpacity>

        </View>
      </View>
      <ScrollView contentContainerStyle={styles.divMedio}>
        <Text style={styles.claseTextoDivMedio}>SELECCIONE EL NUMERO PARA MAS INFORMACION!</Text>
        {preguntas.map((preguntita) => (
          <>
            <Pregunta key={preguntita.Id} numAsk={preguntita.Id} ask={preguntita.Texto} />
          </>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  claseTextoDivMedio: {
    fontSize: 12,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
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
    overflow: 'scroll'
  },
  button: {
    flexDirection: 'row', // Arrange the elements horizontally
    justifyContent: 'center', // Align the elements in the center horizontally
    alignItems: 'center', // Align the elements in the center vertically
  },
});

export default VerHistorialMedico;
