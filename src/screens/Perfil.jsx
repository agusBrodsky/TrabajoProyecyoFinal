import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.navBar}>
        <Text style={styles.titulo}>PERFIL</Text>
        <View style={styles.userIconContainer}>
          {/* Agrega aquí cualquier contenido adicional que desees en la barra de navegación */}
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Mi Aplicación</Text>
        <Button
          title="Presiona el Botón"
          onPress={() => {
            // Agrega aquí la lógica que deseas ejecutar al presionar el botón
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fondo blanco
  },
  logo: {
    width: 200,
    height: 50,
    alignSelf: 'center', // Centrar el logo horizontalmente
    marginTop: 200, // Ajustar el margen superior
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
    marginLeft: 160,
    marginTop: 50,
  },
  userIconContainer: {
    // Estilos para el icono de usuario
  },
  contentContainer: {
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
