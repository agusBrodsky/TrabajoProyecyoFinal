import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import Input from '../components/Input'; // Asegúrate de proporcionar la ruta correcta al archivo de Input
import Logo from '../../assets/logo.png'; // Asegúrate de proporcionar la ruta correcta al archivo de Logo

const Register = () => {
  // Aquí puedes agregar la lógica y componentes necesarios para el proceso de registro.
  const [recibirNotificaciones, setRecibirNotificaciones] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.claseLogo} source={Logo} />
      </View>
      <View style={styles.inputContainer}>
        <Input style={styles.textoUser} placeholder="Nombre" />
        <Input style={styles.textoUser} placeholder="Apellido" />
        <Input style={styles.textoUser} placeholder="Correo electrónico" />
        <Input style={styles.textoUser} placeholder="Contraseña" pass={true} />
      </View>
      <View style={styles.checkboxContainer}>
        <View style={styles.opcionesContainer}>
          <Switch
            value={recibirNotificaciones}
            onValueChange={() => setRecibirNotificaciones(!recibirNotificaciones)}
            trackColor={{ false: "#767577", true: "#007BFF" }}
            thumbColor={recibirNotificaciones ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text style={[styles.opcionTexto, styles.textoIzquierda]}>Recibir notificaciones</Text>
        </View>
        <View style={styles.opcionesContainer}>
          <Switch
            value={aceptarTerminos}
            onValueChange={() => setAceptarTerminos(!aceptarTerminos)}
            trackColor={{ false: "#767577", true: "#007BFF" }}
            thumbColor={aceptarTerminos ? "#f4f3f4" : "#f4f3f4"}
          />
          <Text style={[styles.opcionTexto, styles.textoIzquierda]}>Aceptar términos y condiciones</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo blanco
  },
  logoContainer: {
    position: 'absolute',
    top: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claseLogo: {
    width: 100,
    height: 100,
  },
  textoUser: {
    textAlign: 'left',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: '5%',
    width: '80%',
  },
  checkboxContainer: {
    marginTop: '10%', // Ajusta este valor para separar los checkbox de los inputs
    alignItems: 'flex-start', // Alinea los checkbox a la izquierda
    width: '80%',
  },
  opcionesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  opcionTexto: {
    marginLeft: 10,
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoIzquierda: {
    textAlign: 'left', // Texto alineado a la izquierda
  },
  buttonContainer:{
    position: 'absolute',
    paddingVertical: 15,
    alignSelf: 'center',
    backgroundColor: "#121885",
    borderRadius: 40,
    width: '40%',
    marginTop: '140%',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Register;
