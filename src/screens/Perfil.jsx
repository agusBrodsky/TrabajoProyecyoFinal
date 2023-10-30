import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Perfil() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Aplicación</Text>
      <Button
        title="VerHistorialMedico"
        onPress={() => { 

          navigation.navigate('VerHistorialMedico');          
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
