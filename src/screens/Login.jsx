import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Dimensions, Button, Alert, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [user,setUser] = useState({Usuario:'',Password:'',Correo:''});
  const windowsHeight = Dimensions.get('window').height;
  const windowsWidth = Dimensions.get('window').width;
  const height = (windowsHeight / 10) * 1.2;

  

  const funcionIniciarSesion = () => {
    axios.post('http://localhost:3000/Usuario', user)
      .then((res) => {
        console.log(res.data.message);
          //(res.data.message != "usuario no registrado!") ? navigation.navigate('Home', { user: obj });
          if(res.data.message != null)
          {
            navigation.navigate('Home');//,{ user});
          }
          
      })
      
      .catch(error => {
        console.log("usuario no logueado!")
        Alert.alert('usuario no logueado!');
      });
      

    console.log(user);
  }
  const validarUsuarioCorreo = ( value , id_r ="Usuario") => {
    
    let TOPE = 0;
    while (value.length > TOPE) {
      if (value[TOPE] === '@') {
        id_r = "Correo";
        TOPE = value.length; // salir del bucle
      } else {
        TOPE++;
      }
    }
    handleInputChange(value,id_r);
  };
  const handleInputChange = (value, id_r = 'pass') => {
    console.log(id_r);
    if (id_r === "Usuario") {
      setUser(prevUser => ({
        ...prevUser,
        Usuario: value,
      }));
    }
    if (id_r === "Correo") {
      setUser(prevUser => ({
        ...prevUser,
        Correo: value,
      }));
    }
    if (id_r === "pass") {
      setUser(prevUser => ({
        ...prevUser,
        Password: value,
      }));
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <ImageBackground source={ImLogin} resizeMode="cover" style={styles.imagenFondo}>
        <Image style={styles.claseLogo} source={Logo} />
        <View style={styles.inputContainer}>

          <Input style={styles.textoUser} placeholder="Usuario o correo electrónico"  onChange={validarUsuarioCorreo}/>
          <Input style={styles.textoUser} id_r="password" placeholder="Contraseña" onChange={handleInputChange} pass={true}/>
        </View>
        <View style={styles.claseBoton}>
          <TouchableOpacity onPress={() => funcionIniciarSesion()}>
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textoRegister}>   
          <Text style={styles.texto}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
    marginTop: '114%',
  }
});

export default Login;
