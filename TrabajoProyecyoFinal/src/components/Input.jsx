import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ id,textoArriba,textoFijo='', pass = false, onChange }) => {
  const [inputValue, setInputValue] = useState(textoFijo);

  const ocultarPass = (text) => {
      setInputValue(text);
    onChange(text,id); // Llama a la función onChange del componente padre
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.tamañoLetra}>{textoArriba}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={ocultarPass}
        secureTextEntry={pass}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    width: '70%',
    marginVertical: 6,
  },
  input: {
    borderWidth: 3,
    width: '100%',
    height: 40,
    fontSize: 15,
    color:'black',
    fontWeight: 'bold',
    textAlign: 'left',
    padding:5,
  },
  tamañoLetra: {
    fontSize: 15,
    color:'black',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default Input;
