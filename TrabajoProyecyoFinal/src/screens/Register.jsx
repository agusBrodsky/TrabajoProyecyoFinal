import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Dimensions, Button, Alert,TouchableOpacity} from 'react-native';
import Logo from '../../assets/logo.png';
import ImLogin from '../../assets/imLogin.png';
import Input from '../components/Input';


const windowsHeight = Dimensions.get('window').height;
const windowsWidth = Dimensions.get('window').width;
const height = (windowsHeight / 10) * 1.2;

const Register = () => {
   return(
     <Text>Estamos en Register!</Text>
)
}


export default Register;