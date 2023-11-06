import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import axios from 'axios';
import traerId from '../data/traerId.jsx';


const Home = ({ route, title = 'Error!'}) => {
  const navigation = useNavigation();

  const [isButtonBlocked, setButtonBlocked] = useState(false);
  const [formHecho, setForm] = useState(false);
  const [id, setUserId] = useState(null);
  let textoForm = "Recuerda completar el diario del día";

  const today = new Date();

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const dia1 = format(today, 'yyyy-MM-dd');
    axios.get(`http://localhost:3000/ValidarForm/${dia1}/${id}`)
      .then((res) => {
        //setForm(res.data.valido);
        setForm(false);
      });
  }, []);

  const handleFormularioPress = () => {
    if (formHecho) {
      console.log("Vibrationnn!!");
      Vibration.vibrate(200);
    } else {
      navigation.navigate('Formulario',{id:id});

    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.reminderText}>
        {formHecho ? "Formulario de hoy completado!" : "Recuerda completar el diario del día"}
      </Text>
      {formHecho ? "" : ''}
      <TouchableOpacity
        style={[styles.button, formHecho && styles.disabledButton]}  // Aplicar estilo adicional si formHecho es true
        onPress={formHecho ? null : handleFormularioPress}  // Si formHecho es true, onPress será null
        disabled={formHecho}  // Desactivar el botón cuando formHecho es true
      >
        <Text style={styles.buttonText}>{formHecho ? "Editar" : "Diario del día"}</Text>
      </TouchableOpacity>
      <Text style={styles.recordatorio}>Recuerda tomar tu medicación en</Text>
      {/* Círculo izquierdo */}
      <View style={[styles.circleContainer, styles.circleLeft]}>
        <Svg height="150" width="150">
          <Circle cx="75" cy="75" r="60" fill="#03C4D0" stroke="#0186A0" strokeWidth="2" />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.timerText}>12</Text>
          <Text style={styles.timerLabel}>Hora/s</Text>
        </View>
      </View>

      {/* Círculo derecho */}
      <View style={[styles.circleContainer, styles.circleRight]}>
        <Svg height="150" width="150">
          <Circle cx="75" cy="75" r="60" fill="#03C4D0" stroke="#0186A0" strokeWidth="2" />
        </Svg>
        <View style={styles.textContainer}>
          <Text style={styles.timerText2}>30</Text>
          <Text style={styles.timerLabel}>Minuto/s</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.textBelowDivider}>A continuación</Text>

      <View style={styles.symptomsContainer}>
        <Text style={styles.symptomsText}>Posibles síntomas</Text>
      </View> 
      
      <Text style={styles.symptomsClass}>Motores</Text>
      <Text style={styles.symptomsList}>• Temblor</Text>
      <Text style={styles.symptomsList}>• Rigidez muscular</Text>
      <Text style={styles.symptomsList}>• Akinesia</Text>
      <Text style={styles.symptomsList}>• Alteración postural</Text>

      <Text style={styles.NoMotorClass}>No Motores</Text>
        
      <View style={styles.symptomsContainerNO}>
        <Text style={styles.symptomsNo}>• Fatiga</Text>
        <Text style={styles.symptomsNo}>• Estreñimiento</Text>
        <Text style={styles.symptomsNo}>• Ansiedad</Text>
        <Text style={styles.symptomsNo}>• Depresión</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: 50
  },
  userIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 16,
  },
  reminderText: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 45,
  },
  button: {
    backgroundColor: "#03C4D0",
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  recordatorio: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 30,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circleLeft: {
    position: 'absolute',
    top: 210,
    left: 100,
  },
  circleRight: {
    position: 'absolute',
    top: 290,
    left: 170,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 35,
  },
  timerText: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    top: 5
  },
  timerText2: {
    position: 'absolute',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    top: 5
  },
  timerLabel: {
    position: 'absolute',
    fontSize: 16,
    color: 'white',
    top: 55
  },
  divider: {
    height: 2,
    backgroundColor: "#03C4D0",
    marginHorizontal: 16,
    top: 250,
  },
  textBelowDivider: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    marginTop: 260
  },
  symptomsContainer: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: 25,
  },
  symptomsText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  symptomsList: {
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
  symptomsClass: {
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 5,
    fontSize: 16,
    color: 'black',
    marginLeft: 50,
    marginTop: 10,
    fontWeight: 'bold',
    width: 75,
    fontStyle: 'italic',
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  NoMotorClass: {
    backgroundColor: "#F2F2F2",
    bottom: 145,
    right: 40,
    fontStyle: 'italic',
    position: 'absolute',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 5,
    fontSize: 16,
    color: 'black',
    marginLeft: 50,
    marginTop: 10,
    fontWeight: 'bold',
    width: 100,
    height: 30,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  symptomsContainerNO: {
    position: 'absolute',
    bottom: 45,
    right: 30,
  },
  symptomsNo: {
    fontWeight: 'bold',
    lineHeight: 24,
  },
});

export default Home;
