import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const Pregunta = ({ numAsk=1, ask = 'repete' , press}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={press}>
      <Text style={styles.textClass}>{numAsk + "." + ask}</Text>
    </TouchableOpacity>
    <View style={styles.botonNumero}>
      <TouchableOpacity onPress={press}><Text style={styles.textoBoton}>{18}</Text></TouchableOpacity>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    margin: 5,
    height: Dimensions.get('window').height * 0.03,
  },
  botonNumero: {
    backgroundColor: 'green',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textoBoton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  textClass: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Pregunta;
