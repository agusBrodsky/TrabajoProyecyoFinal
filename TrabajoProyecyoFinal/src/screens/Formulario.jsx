//IMPORTADO DESDE REACT
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, TouchableNativeFeedback,touchableopacity, Button } from 'react-native';
//COMPONENTES
import NavBar from '../components/NavBar';
import preguntitas from '../data/preguntas';
import Input from '../components/Input';
import axios from 'axios';
import Constants from 'expo-constants';

const Formulario = () => {
  // ESTADOS
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({}); // ES UN ARRAY DE PREGUNTAS {  ORDER== 2  }
  const [preguntas, setPreguntas] = useState([]); // ARRAY CON TODAS LAS PREGUNTAS!!
  const [pesatañaForm, setPaginaForm] = useState(1); // Creo un estado para cambiar las preguntas del formulario
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA"); // Estado para cambiar el Titulo del formulario!
  const [respuesta, setRespuestas] = useState([]);
  const [arrayRespuestas, setArrayRespuestas] = useState([]);

  const handleInputChange = (value) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      Texto: value,
    }));
  };


  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta') // No esta probado!
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);

      });
      
  }, []); // Este UseEffect solo se utiliza al correr el programa!
  /*useEffect(() => {
    axios.post('http://localhost:3000/Respuesta', respuesta)
    .then((res) => {
      console.log('Respuesta Enviada con exito');
    })
    .catch((error) => {
      console.log("error al agregar a la base de datos")
    })
  },[arrayRespuestas]);*/
  useEffect(() =>{
    axios.post('http://localhost:3000/Respuesta', arrayRespuestas)
    .then((res) => {
      console.log(respuesta);
      console.log(arrayRespuestas);
      console.log("Correcto!");
    })
    .catch((error) =>{
      console.log(respuesta);
      console.log(arrayRespuestas);
      console.log("error");
    })
  },[pesatañaForm]) 

  // Función para manejar el botón "Si"
// Función para manejar el botón "Si"
const onPressSi = (id, pregunta) => {
  setSegundaPregunta((prevPreguntas) => ({
    ...prevPreguntas,
    [id]: true,
  }));

  setRespuestas({
    Id: id,
    TextoPregunta: pregunta,
    Opcion: null,
    Texto: null,
    IdParteCuerpo: null,
    Orden: pesatañaForm,
  });

  setArrayRespuestas((prevRespuestas) => [...prevRespuestas, respuesta]);
};

// Función para manejar el botón "No"
const onPressNo = (id, pregunta) => {
  setSegundaPregunta((prevPreguntas) => ({
    ...prevPreguntas,
    [id]: false,
  }));

  setRespuestas({
    Id: id,
    TextoPregunta: pregunta,
    Opcion: null,
    Texto: null,
    IdParteCuerpo: null,
    Orden: pesatañaForm,
  });

  setArrayRespuestas((prevRespuestas) => [...prevRespuestas, respuesta]);
};
  // Componente de botón verde "Si"
  const BotonVerde = ({ id, pregunta }) => {
    return (
      <Button onPress={() => onPressSi(id, pregunta)} title="Si">
        <View style={[styles.claseBoton, styles.verdeBoton]}>
          <Text style={styles.botonTexto}>Si</Text>
        </View>
      </Button>
    );
  };

  // Componente de botón rojo "No"
  const BotonRojo = ({ id,pregunta }) => {
    // <TouchableNativeFeedback></TouchableNativeFeedback>  
    return (
      <Button onPress={() => onPressNo(id,pregunta)} title="No">
        <View style={[styles.claseBoton, styles.rojoBoton]}>
          <Text style={styles.botonTexto}>No</Text>
        </View>
      </Button>
      
    );
  };

  // Función para continuar al siguiente formulario o pasar de pagina
  const continuarForm = () => {
    if (pesatañaForm != 2) {
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
        {preguntas.map((repo) => {
            return (
              <View key={repo.Id} style={styles.claseNoSeMeOcurre}>
                <Text style={styles.clasePregunta}>{repo.Texto}</Text>
                <View style={styles.claseBotonesContainer}>
                  <BotonVerde id={repo.Id} pregunta={repo.Texto} />
                  <BotonRojo id={repo.Id} pregunta={repo.Texto} />
                </View>
                {segundaPregunta[repo.Id] && (  // ACA HABILITO LA SEGUNDA PREGUNTA!! LE AGREGO UN ID ANTERIORMENTE ASI SE PUEDE VER! 
                  <View style={styles.inputContainer}>
                    <Input placeholder={repo.preguntaHabilitada} onChange={handleInputChange} />
                  </View>
                )}                
              </View>
            );
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