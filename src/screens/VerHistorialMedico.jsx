import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'; // Importa Modal de react-native
import Logo from '../../assets/logo.png';
import Pregunta from '../components/Pregunta';
import NavBar from '../components/NavBar';
import axios from 'axios';
import pipu from '../data/preguntas';
import MasInfo from '../components/MasInfo';
import preguntaEsp from '../data/preguntaEsp';
import { format } from 'date-fns'; // para cambiar un datetime a mas manero!!
import { es } from 'date-fns/locale'; // Importa el objeto "es" para traducciones en español
import { startOfMonth, endOfMonth } from 'date-fns';


const VerHistorialMedico = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [cantidadPorOrden, setCantidadPorOrden] = useState({});
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [fecha1, setFecha1] = useState(lastDayOfMonth);
  const [modalVisible, setModalVisible] = useState(false);
  const [respuestaEspecifica, setRespuestaEspecifica] = useState([]);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(1); // Inicializa el contador en 1
  const [newRespuesta, setNewRespuesta] = useState([{}]);
  const [firstLoading, setFirstLoading] = useState(false);
  //const [preguntaModal, setPreguntaModal] = useState();
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
    axios.get(`http://localhost:3000/Pregunta`)
      .then((res) => {
        setPreguntas(res.data);
      });
    //---------------------------------------------------------------------------------------------------------------------------------------
    axios.get(`http://localhost:3000/Respuesta`)
      .then((res) => {
        setRespuesta(res.data);

        /*const cantidadRespuestasPorOrden = {};
        res.data.forEach((item) => {
            if (item.Opcion) {
              cantidadRespuestasPorOrden[item.Orden] = (cantidadRespuestasPorOrden[item.Orden] || 0) + 1;
            }
          });
          setCantidadPorOrden(cantidadRespuestasPorOrden);*/
      })
      .finally(setFirstLoading(true));
    cambiarMes();
  }, []);

  useEffect(() => {
    const cantidadRespuestasPorOrden = {};

    respuesta.forEach((item) => {
      if (item.Opcion) {
        cantidadRespuestasPorOrden[item.Orden] = (cantidadRespuestasPorOrden[item.Orden] || 0) + 1;
      }
    });
    setCantidadPorOrden(cantidadRespuestasPorOrden);
  }, [respuesta]);

  const cambiarMes = async (cambio = 'menor') => {
    try {
      let newFecha1 = new Date(fecha1);
      if (cambio === "menor") {
        newFecha1.setMonth(newFecha1.getMonth() - 1);
      };
      if (cambio === "mayor") {
        newFecha1.setMonth(newFecha1.getMonth() + 1);
      }
      // Calcula el primer día del mes
      const primerDia = startOfMonth(newFecha1);
      // Calcula el último día del mes
      const ultimoDia = endOfMonth(newFecha1);
      const dia1 = format(primerDia, 'yyyy-MM-dd'); // Convierte el primer día a formato "yyyy-MM-dd"
      const dia2 = format(ultimoDia, 'yyyy-MM-dd'); // Convierte el último día a formato "yyyy-MM-dd"
      // Realiza la llamada a la API con las fechas calculadas
      axios.get(`http://localhost:3000/Fecha/${dia1}/${dia2}/1`)
        .then((res) => {
          setNewRespuesta(res.data[0]);
          setFirstLoading(true);
        })
        .catch((error) => {
          console.error('Error al hacer la llamada a la API:', error);
        })

      setFecha1(newFecha1); // Actualiza la fecha en el estado
    } catch (error) {
      console.error('Error en la función cambiarMes:', error);
    }
  }


  const handleButton = (idPregunta = 1) => {
    let newFecha1 = new Date(fecha1);
    const primerDia = startOfMonth(newFecha1);
    const ultimoDia = endOfMonth(newFecha1);
    const dia1 = format(primerDia, 'yyyy-MM-dd');
    const dia2 = format(ultimoDia, 'yyyy-MM-dd'); 
    console.log("Entre a la funcion handleButton");
    axios.get(`http://localhost:3000/Respuesta/${dia1}/${dia2}/${idPregunta}`)
      .then((res) => {
        console.log(res.data);
        setRespuestaEspecifica(res.data);
        setLoading(true);
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
        
          <View style={styles.dateContainer}><Text style={styles.claseTexto}>{meses[fecha1.getMonth()].nombre}</Text>
          <Text style={styles.yearText}>{fecha1.getFullYear()}</Text>
          </View>
          
          <TouchableOpacity onPress={() => cambiarMes("mayor")}>
            <Text style={styles.buttonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divMedio}>

        <ScrollView >
          {firstLoading != true ? (
            <Text style={styles.claseTextoDivMedio}>Cargando...</Text>
          ) : (
            <React.Fragment >
              <Text style={styles.claseTextoDivMedio}>SELECCIONE EL NUMERO PARA MAS INFORMACION!</Text>
              {preguntas.map((preguntita, index) => (
                <Pregunta
                  key={`${newRespuesta[index]?.Id}_${index}`}
                  numAsk={newRespuesta[index]?.Id || 1}
                  ask={newRespuesta[index]?.TextoPregunta}
                  cant={newRespuesta[index]?.CANTIDAD || 0}
                  press={() => handleButton(newRespuesta[index]?.Id || 1)}
                />
              ))}
            </React.Fragment>
          )}
        </ScrollView>

      </View>

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
            <ScrollView>
              <Text style={styles.modalTitle}>Detalles de la Pregunta</Text>

              <React.Fragment>
                {respuestaEspecifica.map((askito) => (
                  <MasInfo
                    key={askito.Id}
                    textFecha={askito.TextoPregunta}
                    //textFecha={format(new Date(askito.Dia), "eeee d 'de' MMMM yyyy", { locale: es })}
                    text={askito.Texto}
                  />
                ))}
              </React.Fragment>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
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
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
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
    // Cambia el valor multiplicativo para ajustar la altura del modal
    height: Dimensions.get('window').height * 0.5, // Por ejemplo, ajusta este valor
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
    /* SEGUNDA OPCION!!
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    textAlign:'center'
    //
    Y PONER EL BOTON AFUERA DEL SCROLLVIEW!!
    
    */
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  yearText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'column', // Establece la disposición de los elementos hijos en columna
    alignItems: 'center', // Alinea los elementos hijos en el centro horizontalmente
    marginTop: 10, // Puedes ajustar el margen según tus necesidades
  },
});

export default VerHistorialMedico;
