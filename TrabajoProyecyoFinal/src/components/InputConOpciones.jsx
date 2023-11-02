import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Picker } from 'react-native';
const InputConOpciones = ({ id, placeholder, pass = false, options, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (text) => {
    setInputValue(text);
    onChange(text, id);
  };

  const handlePickerChange = (value) => {
    setInputValue(value);
    onChange(value, id);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.tamañoLetra}>{placeholder}</Text>
      {options ? (
        <Picker
          selectedValue={inputValue}
          style={styles.picker}
          onValueChange={handlePickerChange}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      ) : (
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleChange}
          secureTextEntry={pass}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    inputContainer: {
      width: '70%',
      marginVertical: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333', // Color del texto
    },
    picker: {
      borderWidth: 2,
      borderColor: 'black', // Color del borde del Picker
      borderRadius: 8, // Bordes redondeados
    },
    input: {
      borderWidth: 3,
      borderColor: 'black', // Color del borde del TextInput
      borderRadius: 8, // Bordes redondeados
      height: 40,
      paddingLeft: 10, // Espaciado a la izquierda del texto en TextInput
    },
    tamañoLetra: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });
  

export default InputConOpciones;
