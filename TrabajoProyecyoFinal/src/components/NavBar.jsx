import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Logo from '../../assets/logo.png';
import IconPerfil from '../../assets/iconPerfil.png';

const windowsHeight = Dimensions.get('window').height;
const height = (windowsHeight / 4) * 1.7;

const NavBar = ({ textoInicio = 'Home' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.claseLogo} source={Logo} />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.claseTexto1}>{textoInicio}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={styles.clasePerfil} source={IconPerfil} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#03C4D0',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:50
  },
  // Clase para el logo
  leftContainer: {
    flex: 1,
    paddingLeft: 10,
  },
   claseLogo: {
    borderRadius: 100,
    width: '100%',
    maxWidth: 80,
    height: '100%',
    maxHeight: 80,
  },
  // Clase para el texto
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  claseTexto1: {
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
  },
  // Clase para el perfil
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  clasePerfil: {
    width: '100%',
    maxWidth: 35,
    height: '100%',
    maxHeight: 35,
  }
  
});

export default NavBar;