import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'; // Importa Modal de react-native
import Logo from '../../assets/logo.png';
import Pregunta from '../components/Pregunta';
import NavBar from '../components/NavBar';
import axios from 'axios';
import pipu from '../data/preguntas';

const VerHistorialMedico = () => {
  const [preguntas, setPreguntas] = useState([]);
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [fecha1, setFecha1] = useState(lastDayOfMonth);
  const [modalVisible, setModalVisible] = useState(false);

  const meses = [
    { nro: 0, nombre: 'Enero' },
    { nro: 1, nombre: 'Febrero' },
    { nro: 2, nombre: 'Marzo' },
    { nro: 3, nombre: 'Abril' },
    { nro: 4, nombre: 'Mayo' },
    { nro: 5, nombre: 'Junio' },
    { nro: 6, nombre: 'Julio' },
    { nro: 7, nombre: 'Agosto' },
    { nro: 8, nombre: 'Septiembre' },
    { nro: 9, nombre: 'Octubre' },
    { nro: 10, nombre: 'Noviembre' },
    { nro: 11, nombre: 'Diciembre' }
  ];

  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta')
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);

  const cambiarMes = async (cambio) => {
    try {
      if (cambio === "menor") {
        const newFecha1 = new Date(fecha1);

        newFecha1.setMonth(newFecha1.getMonth() - 1);

        setFecha1(newFecha1);

      }
      else {
        const newFecha1 = new Date(fecha1);
        newFecha1.setMonth(newFecha1.getMonth() + 1);

        setFecha1(newFecha1);
      }
      const fechaActual = new Date();
      const dia1 = "2022-03-1"; // la fecha de inicio
      const dia2 = "2022-03-31"; // la fecha de fin
      const idUsuario = 1;

      //axios.get(`http://localhost:3000/Fecha/${fecha1}/${dia2}/${idUsuario}`)
      axios.get(`http://localhost:3000/Fecha/${dia1}/${dia2}/${idUsuario}`)

        .then((res) => {
          console.log(res.data);
        })

      console.log(response.data);

    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
    }
  }
  const handleButton = (idPregunta = 1) => {
    console.log("entre!!");
    axios.get(`http://localhost:3000/Respuesta/${idPregunta}`) // AVISARLE A SANTI QUE FALTA ESTE!!!
    .then((res) =>{
      console.log(res.data);
    })
    .finally(
      setModalVisible(true),
    )
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
          <Text style={styles.claseTexto}>{meses[fecha1.getMonth()].nombre}</Text>
          <TouchableOpacity onPress={() => cambiarMes("mayor")}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.divMedio}>
        <Text style={styles.claseTextoDivMedio}>SELECCIONE EL NUMERO PARA MAS INFORMACION!</Text>
        {pipu.map((preguntita) => (
          <Pregunta key={preguntita.Id} numAsk={preguntita.Id} ask={preguntita.Texto} press={handleButton} />
        ))}
      </ScrollView>

      {/* Modal */}
          
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Detalles de la Pregunta</Text>
      <Text style={styles.modalText}>Aquí puedes agregar información adicional relacionada con la pregunta.</Text>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
}

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: Dimensions.get('window').width * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VerHistorialMedico;
