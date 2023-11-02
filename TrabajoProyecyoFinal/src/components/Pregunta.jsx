import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const Pregunta = ({ numAsk , ask = 'repete', cant = 0 , press }) => {
  return (
    (ask == 'repete') ? 
    <View></View> :
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={press}>
        <Text style={styles.textClass}>{numAsk + "." + ask}</Text>
      </TouchableOpacity>
      <View style={styles.botonContainer}>
        <TouchableOpacity style={styles.botonNumero} onPress={press}>
          <Text style={styles.textoBoton}>{cant}</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Coloca los elementos en una fila horizontal
    justifyContent: 'space-between', // Espacio entre los elementos
    alignItems: 'center', // Centra verticalmente los elementos en el contenedor
    marginBottom: 10, // Agrega espacio entre las instancias de Pregunta
  },
  touchableOpacity: {
    flex: 1, // Ocupa todo el espacio disponible
    overflow: 'hidden',
  },
  botonContainer: {
    margin:12,
  },
  botonNumero: {
    backgroundColor: '#03C4D0',
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textoBoton: {
    fontSize: 20,
    color: 'white',
  },
  textClass: {
    marginLeft:10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pregunta;
