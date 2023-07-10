//IMPORTADO DESDE REACT
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import Input from '../components/Input';
import axios from 'axios';

const Formulario = () => {
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({});
  const [preguntas, setPreguntas] = useState([]); // ARRAY DE PREGUNTAS INICIALES
  const [pesatañaForm, setPaginaForm] = useState(1);
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA");
  const [arrayRespuestas, setArrayRespuestas] = useState([]); // ARRAY DE RESPUESTAS!!
  const [valorInput, setInput] = useState("");
  const handleInputChange = (value) => { // FUNCION QUE GUARDA VALOR DEL INPUT
    setInput(value); 
  };

  useEffect(() => { // SE CORRE CUANDO ARRANCA Y GUARDA EN UN ESTADO TODAS LAS PREGUNTAS
    axios.get('http://localhost:3000/Pregunta') 
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);

  const onPressSi = (id, pregunta) => { 
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: true,
    }));

    const nuevaRespuesta = { // NUEVA PREGUNTA
      Id: id,
      TextoPregunta: pregunta,
      Opcion: null,
      Texto: valorInput,
      IdParteCuerpo: null,
      Orden: pesatañaForm,
    };

    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
  };

  const onPressNo = (id, pregunta) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: false,
    }));

    const nuevaRespuesta = { // NUEVA PREGUNTA
      Id: id,
      TextoPregunta: pregunta,
      Opcion: null,
      Texto: valorInput,
      IdParteCuerpo: null,
      Orden: pesatañaForm,
    };

    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
  };

  const continuarForm = () => {

    console.log(arrayRespuestas);
    arrayRespuestas.map((respuesta)=>( 
      
    console.log(respuesta),
    axios.post('http://localhost:3000/Respuesta', respuesta)  
        .then((res) => {
          console.log('Respuestas enviadas con éxito');
        })
        .catch((error) => {
          console.log('Error al agregar las respuestas a la base de datos', error);
        })
    ))
    
    if (pesatañaForm !== 2) {
      setPaginaForm(2);
      setTituloForm("EVALUACIÓN NO MOTORA");
    } else {
      // Realizar la inserción en la base de datos aquí
      navigation.navigate("Home");
    }
  };
  const cambiarPagina = () =>{
    navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloForm}</Text>
      <Button title="aca luki" onPress={cambiarPagina}></Button>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {preguntas.map((pregunta) => (
          <View key={pregunta.Id} style={styles.preguntaContainer}>
            <Text style={styles.clasePregunta}>{pregunta.Texto}</Text>
            <View style={styles.claseBotonesContainer}>
              <Button onPress={() => onPressSi(pregunta.Id, pregunta.Texto)} title="Si" />
              <Button onPress={() => onPressNo(pregunta.Id, pregunta.Texto)} title="No" />
            </View>
            {segundaPregunta[pregunta.Id] && (
              <View style={styles.inputContainer}>
                <Input placeholder={pregunta.preguntaHabilitada} onChange={handleInputChange} />
              </View>
            )}
          </View>
        ))}
        <View style={styles.continuarContainer}>
          <Button title="Continuar" onPress={continuarForm} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  titulo: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 32,
  },
  preguntaContainer: {
    marginTop: '10%',
    paddingVertical: 20,
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
  inputContainer: {
    alignItems: 'center',
  },
  continuarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default Formulario;
