import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Editar() {
  const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');

  const handleConfirmarCambios = () => {
    // Aquí puedes agregar la lógica para confirmar los cambios
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.titulo}>EDITAR</Text>
      </View>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.userName}>Nombre del Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre de Usuario"
        value={nuevoNombreUsuario}
        onChangeText={(text) => setNuevoNombreUsuario(text)}
      />
      <TextInput
        style={styles.input2}
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={nuevaContrasena}
        onChangeText={(text) => setNuevaContrasena(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmarCambios}>
        <Text style={styles.buttonText}>Confirmar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navBar: {
    backgroundColor: "#03C4D0",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 100,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 30
  },
  logo: {
    width: 175,
    height: 175,
    alignSelf: 'center',
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: '#03C4D0',
    borderWidth: 3,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 70,
  },
  input2: {
    height: 40,
    borderColor: '#03C4D0',
    borderWidth: 3,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#03C4D0",
    width: 200,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
