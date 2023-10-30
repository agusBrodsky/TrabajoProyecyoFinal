import React from 'react';
import { View, Text, StyleSheet, Image,Dimensions,TouchableOpacity } from 'react-native';
import IconPerfil from '../../assets/iconPerfil.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
const NavBar = ({ title = 'Error', onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.leftContainer}>
      <Icon name="arrow-back" size={24} color="white" /> {/* Icono de flecha de retroceso */}
        
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text style={styles.claseTexto}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {/* Agrega aquí cualquier otro contenido que desees en el lado derecho de la barra de navegación */}
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
    textAlign: 'center',
    flex: 1,
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
  leftContainer: {
    top: -10,
  },
});

export default NavBar;
