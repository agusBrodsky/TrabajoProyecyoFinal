import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Dimensions, Button, Alert, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';


const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;
const height = (windowsHeight / 10) * 1.2;

const Login = () => {
  const funcionIniciarSesion = (mensaje) => {
    Alert.alert(mensaje);
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={ImLogin} resizeMode="cover" style={styles.imagenFondo}>
        <Image style={styles.claseLogo} source={Logo} />
        <View style={styles.inputContainer}>
          <Input style={styles.textoUser} placeholder="Usuario o correo electrónico" />
          <Input style={styles.textoUser} placeholder="Contraseña" pass={true}/>
        </View>
        <View style={styles.claseBoton}>
          <TouchableOpacity onPress={() => funcionIniciarSesion("Por hacer!!")}>
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textoRegister}>   
          <Text style={styles.texto}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
            <Text style={styles.textoLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagenFondo: {
    flex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBoton: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "sans-serif",
    fontWeight: 'bold'
  },
  textoUser: {
    textAlign: 'left',
    fontSize: 16
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
    width: 200,
    height: 200,
    position: 'absolute',
    top: '22%',
    alignSelf: 'center',
    zIndex: 1
  },
  inputContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: '40%',
    width: '80%'
  },
  claseBoton: {
    position: 'absolute',
    paddingVertical: 20,
    alignSelf: 'center',
    backgroundColor: "#121885",
    borderRadius: 40,
    width: '50%',
    marginTop: '115%',
  }
});

export default Login;
