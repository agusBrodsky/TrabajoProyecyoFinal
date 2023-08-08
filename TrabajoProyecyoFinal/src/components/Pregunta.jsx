import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const Pregunta = ({ ask = 'repete' }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { console.log('nashe') }}>
        <Text style={styles.textClass}>{ask}</Text>
      </TouchableOpacity>
      <View style={styles.botonNumero}>
        <Text style={styles.textoBoton}>18</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#03C4D0',
    margin: 10,
    height: Dimensions.get('window').height * 0.03,
    paddingHorizontal: 10,
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
    fontSize: 18,
    marginRight: 10,
  },
});

export default Pregunta;
