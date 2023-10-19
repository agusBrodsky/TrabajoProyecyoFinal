import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle } from 'react-native-svg'; // Importa Circle de react-native-svg
import { useNavigation } from '@react-navigation/native';
import { startOfMonth, endOfMonth } from 'date-fns';
import { format } from 'date-fns'; // para cambiar un datetime a mas manero!!
import { es } from 'date-fns/locale'; // Importa el objeto "es" para traducciones en español
import axios from 'axios';

const Home = ({ title }) => {
  const navigation = useNavigation();
  
  const [isButtonBlocked, setButtonBlocked] = useState(false);

  const [formHecho,setForm] = useState(false);
  
  let textoForm = "Recuerda completar el diario del día";

  const today = new Date();
  const mañana = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  useEffect(()=>{
    const idUsuario = 1;
    
    const dia1 = format(today, 'yyyy-MM-dd');
    axios.get(`http://localhost:3000/ValidarForm/${dia1}/${idUsuario}`)
      .then((res) => {
        setForm(res.data.valido);
      })
  }),[]
  const handleFormularioPress = () => {
    // Navegar a la pantalla "Formulario"
    if (formHecho) {
      console.log("Vibrationnn!!")
      Vibration.vibrate(200);}
      else{
    navigation.navigate('Formulario');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.userIconContainer}>
          <TouchableOpacity onPress={() => handleProfilePress()}>
            <Icon name="user" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.reminderText}>{ (!formHecho) ? "Recuerda completar el diario del día" : "Formulario completado!"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFormularioPress}>
        <Text style={styles.buttonText}>Diario del día</Text>
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
          <Text style={styles.timerText}>30</Text>
          <Text style={styles.timerLabel}>Minuto/s</Text>
        </View>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />
<View style={styles.fullWidthDivider} >

    </View>
    </View>
    
    );
};

const handleProfilePress = () => {
  // Aquí puedes navegar a la pantalla de perfil de la cuenta
  // utilizando el sistema de navegación de tu aplicación
  // por ejemplo, navigation.navigate('Profile');
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
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
    top: 320, // Ajusta la posición vertical del círculo izquierdo
    left: 100, // Ajusta la posición horizontal del círculo izquierdo
  },
  circleRight: {
    position: 'absolute',
    top: 395, // Ajusta la posición vertical del círculo derecho
    left: 170, // Ajusta la posición horizontal del círculo derecho
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 35, // Ajusta la posición vertical del texto
  },
  timerText: {
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
    top: 250 // Ajusta la posición vertical de la línea divisoria
  },
  fullWidthDivider: {
    height: 2,
    backgroundColor: "gray", // Color gris
    marginHorizontal: 0, // Margen horizontal de 0 para ocupar todo el ancho
    top: 280, // Ajusta la posición vertical de la línea divisoria inferior
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // Sombra hacia abajo
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 3, // Radio de la sombra
  },
});

export default Home;
