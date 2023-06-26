import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, pass = false }) => {
  
  const [inputValue, setInputValue] = useState(''); // Estado para guardar el valor del input

  const ocultarPass = (text) => {
    if (pass) {
      setInputValue(text.replace(/./g, '*')); // si pass = true entonces remplaza por * (esto lo utilizo en el login)
    } else {
      setInputValue(text);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.tamañoLetra}>{placeholder}</Text>
      <TextInput
        style={styles.input} // Style
        value={inputValue} // Guarda el valor en el estado
        onChangeText={ocultarPass} //Llama a la funcion
      />
    </View>
  );
};
//Clases--Styles
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
  },
  tamañoLetra: {
    fontSize: 23,
  },
});

export default Input;