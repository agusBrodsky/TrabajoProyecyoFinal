import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Dimensions, Button, Alert } from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';

const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;
const height = (windowsHeight / 10) * 1.2;

const Login = () => {
  const funcionIniciarSesion = (props) => {
    Alert.alert(props);
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={ImLogin} resizeMode="cover" style={styles.imagenFondo}>
        <Image style={styles.claseLogo} source={Logo} />
        <View style={styles.inputContainer}>
          <Input style={styles.textoUser} placeholder="Usuario o correo electrónico" />
          <Input style={styles.textoUser} placeholder="Contraseña" pass={true}/>
        </View>
        <View style={styles.claseBoton}>
          <Button
            title="Iniciar Sesión"
            onPress={() => funcionIniciarSesion("Por hacer!!")}
          />
        </View>
        <View style={styles.textoRegister}>
          <text>¿No tienes cuenta?</text>
          <text>Registrate</text>
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
  textoUser:{
    textAlign: 'left',
    fontSize: 10
  },
  textoRegister:{
    position: 'absolute',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '175%',
  },


  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: "#03C4D0",
    borderRadius: 40,
    width: '50%',
    marginTop: '130%'
  }
});

export default Login;