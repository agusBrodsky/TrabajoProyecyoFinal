import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Aplicación</Text>
      <Button
        title="Presiona el Botón"
        onPress={() => {
          // Agrega aquí la lógica que deseas ejecutar al presionar el botón
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
