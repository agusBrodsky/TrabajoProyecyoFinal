//IMPORTADO DESDE REACT
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableNativeFeedback, Button } from 'react-native';
//COMPONENTES
import NavBar from '../components/NavBar';
import preguntitas from '../data/preguntas';
import Input from '../components/Input';
import axios from 'axios';


const Formulario = () => {
  // ESTADOS
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({});
  const [preguntas, setPreguntas] = useState([]);
  const [pesatañaForm, setPaginaForm] = useState(1); // Creo un estado para cambiar las preguntas del formulario
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA"); // Estado para cambiar el Titulo del formulario!

  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta') // No esta probado!
      .then((res) => {
        const arrayPreguntas = res.data.data;
        setPreguntas(arrayPreguntas);
      });
  }, []); // Este UseEffect solo se utiliza al correr el programa!

  // Función para manejar el botón "Si"
  const onPressSi = (id, pregunta) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: true,
    }));
  };

  // Función para manejar el botón "No"
  const onPressNo = (id) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: false,
    }));
  };

  // Componente de botón verde "Si"
  const BotonVerde = ({ id, pregunta }) => {
    return (
      <TouchableNativeFeedback onPress={() => onPressSi(id, pregunta)}>
        <View style={[styles.claseBoton, styles.verdeBoton]}>
          <Text style={styles.botonTexto}>Si</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  // Componente de botón rojo "No"
  const BotonRojo = ({ id }) => {
    return (
      <TouchableNativeFeedback onPress={() => onPressNo(id)}>
        <View style={[styles.claseBoton, styles.rojoBoton]}>
          <Text style={styles.botonTexto}>No</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  // Función para continuar al siguiente formulario o pasar de pagina
  const continuarForm = () => {
    if (pesatañaForm === 1) {
      setPaginaForm(2); // Actualiza las preguntas para el formulario no motoras
      setTituloForm("EVALUACIÓN NO MOTORA"); // Cambia el título del formulario
    } else {
      navigation.navigate("Home"); // Navega a la página principal
    }
  };

  return (
    <View style={styles.container}>
      <NavBar textoInicio='Helpark' />
      <Text style={styles.titulo}>{tituloForm}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {preguntitas.map((repo) => {
          if (repo.idForm === pesatañaForm) {
            return (
              <View key={repo.id} style={styles.claseNoSeMeOcurre}>
                <Text style={styles.clasePregunta}>{repo.pregunta}</Text>
                <View style={styles.claseBotonesContainer}>
                  <BotonVerde id={repo.id} pregunta={repo.pregunta} />
                  <BotonRojo id={repo.id} pregunta={repo.pregunta} />
                </View>
                {segundaPregunta[repo.id] && (
                  <View style={styles.inputContainer}>
                    <Input placeholder={repo.preguntaHabilitada} />
                  </View>
                )}
              </View>
            );
          } else {
            return null;
          }
        })}
        <View style={styles.continuarContainer}>
          <Button title="Continuar" onPress={() => continuarForm()} />
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos del componente Formulario
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },


  // Estilos del título del formulario
  titulo: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 32,
  },

  // Estilos de la sección de pregunta
  claseNoSeMeOcurre: {
    marginTop: '10%',
    paddingVertical: 20,
  },
  preguntaContainer: {
    maxHeight: 100,
    paddingHorizontal: 20,
  },
  clasePregunta: {
    textAlign: 'center',
    fontSize: 25,
  },
  claseBotonesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  // Estilos de los botones
  claseBoton: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  verdeBoton: {
    backgroundColor: '#36D06A',
  },
  rojoBoton: {
    backgroundColor: '#E10A0A',
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos del texto adicional
  textoAdicional: {
    fontSize: 20,
  },

  // Estilos del contenedor del botón de continuar
  inputContainer: {
    alignItems: 'center',
  },
  continuarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
export default Formulario;