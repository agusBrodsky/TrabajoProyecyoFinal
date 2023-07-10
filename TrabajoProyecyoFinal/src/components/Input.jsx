import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, pass = false, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const ocultarPass = (text) => {
    if (pass) {
      setInputValue(text.replace(/./g, '*'));
    } else {
      setInputValue(text);
    }
    onChange(text); // Llama a la función onChange del componente padre
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.tamañoLetra}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={ocultarPass}
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
  },
  tamañoLetra: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default Input;
