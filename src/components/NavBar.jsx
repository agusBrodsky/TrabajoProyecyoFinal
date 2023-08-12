import React from 'react';
import { View, Text, StyleSheet, Image,Dimensions } from 'react-native';
import IconPerfil from '../../assets/iconPerfil.png';

const NavBar = ({ textoInicio = 'Home' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.claseTexto}>{textoInicio}</Text>
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
    height: Dimensions.get('window').height *0.13, // Ajusta la altura según tus necesidades
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between', // Alinea los elementos a los extremos
    paddingHorizontal: 10,
  },
  centerContainer: {
    flex: 1,
    left:20,
    top:-10
  },
  claseTexto: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  rightContainer: {},
  clasePerfil: {
    top:-10,
    width: 25,
    height: 25,
  },
});

export default NavBar;
