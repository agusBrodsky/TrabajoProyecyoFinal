import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import Input from '../components/Input'; 
import Logo from '../../assets/logo.png'; 
import InputConOpciones from '../components/InputConOpciones';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
  const navigation = useNavigation();
  let date = new Date().toISOString();
  const [user, setUser] = useState({
    Nombre: null,
    Apellido: null,
    Sexo: null,
    FechaDeNacimiento: date,
    Correo: null,
    Password: null,
  });
  const [recibirNotificaciones, setRecibirNotificaciones] = useState(false);
  const [aceptarTerminos, setAceptarTerminos] = useState(false);

  const handleInputChange = (value, id) => {
    setUser(prevUser => ({
      ...prevUser,
      [id]: value,
    }));
  };
  const funcionIniciarSesion = ()=>{
    axios.post('http://localhost:3000/Register', user)
    .then((res) => {
      console.log(res.data.message);
        if(res.data.message != null)
        {
          navigation.navigate('Home');//,{ user:obj});
        }  
    })
    .catch(error => {
      console.log("usuario no registrado!")
    });
    
  }
  const genderOptions = [
    {label:'',value:null},
    { label: 'Femenino', value: 'F' },
    { label: 'Masculino', value: 'M' },
    { label: 'Otro', value: 'Otro' },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.claseLogo} source={Logo} />
      </View>
      <View style={styles.inputContainer}>
      <Input
          style={styles.textoUser}
          placeholder="Nombre"
          onChange={value => handleInputChange(value, 'Nombre')}
        />
        <Input
          style={styles.textoUser}
          placeholder="Apellido"
          onChange={value => handleInputChange(value, 'Apellido')}
        />
        <Input
          style={styles.textoUser}
          placeholder="Correo electrónico"
          onChange={value => handleInputChange(value, 'Correo')}
        />
        <Input
          style={styles.textoUser}
          placeholder="Contraseña"
          pass={true}
          onChange={value => handleInputChange(value, 'Password')}
        />
        <InputConOpciones
        style={styles.textoUser}
        placeholder="Sexo"
        options={genderOptions}
        onChange={value => handleInputChange(value, 'Sexo')}
      />
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
      <TouchableOpacity style={styles.buttonContainer} onPress={() => funcionIniciarSesion()}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.textoRegister}>   
          <Text style={styles.texto}>Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textoLink}>Inicia Sesion!😊</Text>
          </TouchableOpacity>
        </View>
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
  textoRegister: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '165%',
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "sans-serif",
  },
  textoLink: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "sans-serif",
    textDecorationLine: 'underline',
    marginLeft: 5, 
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
