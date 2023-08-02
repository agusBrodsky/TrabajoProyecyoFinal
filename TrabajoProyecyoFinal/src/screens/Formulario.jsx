import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import axios from 'axios';

const Formulario = () => {
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({}); // ARRAY RESPUESTAS
  const [preguntas, setPreguntas] = useState([]); // ARRAY DE PREGUNTAS INICIALES
  const [pesatañaForm, setPaginaForm] = useState(1);
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA");
  const [arrayRespuestas, setArrayRespuestas] = useState([]); // ARRAY DE RESPUESTAS!!
  const [valorInput, setInput] = useState("");
  const [pip, setPip] = useState(true);
  // HACER UNA BUSQUEDA LINEAL CON OPCION (IDPREGUNTA) PARA BUSCAR LOS IGUALES Y ELIMINARLOS (CUNADO AGREGAS A NUEVA FUNCION QUE HAGA LA BUSQUEDA LINEAL ANTES DE AGREGAR A ARRAYRESPUESTA)
  const handleInputChange = (value, id_r) => {
    setInput(value);
    actualizarTexto(id_r, value);
    console.log(arrayRespuestas);
  };

  function actualizarTexto(id, value) {
    const actualizado = arrayRespuestas.map(resp => {
      if (resp.Orden === id) {
        return { ...resp, Texto: value };
      }
      return resp;
    });
    setArrayRespuestas(actualizado);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/Pregunta')
      .then((res) => {
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);

  const onPressSi = (id, pregunta, idForm) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: true,
    }));

    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: pregunta,
      Opcion: 1,
      Texto: valorInput !== "" ? valorInput : null,
      IdParteCuerpo: null,
      IdForm: idForm + 1,
      Orden: id,
    };
    //verificarNoIguales(nuevaRespuesta);

    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
    console.log(arrayRespuestas);
  };
  const verificarNoIguales = (nuevaRespuesta) => {
    setArrayRespuestas((prevRespuestas) => {
      return prevRespuestas.filter((respuesta) => {
        // Compare the properties that need to be unique for each response
        return respuesta.Orden !== nuevaRespuesta.Orden &&
          respuesta.TextoPregunta !== nuevaRespuesta.TextoPregunta;
      });
    })
    let idRespuestaRepetida = null;
    arrayRespuestas.map((objeto) => { // objeto es la respuesta en cada ciclo!

    })
    //.............................................................
  }
  const onPressNo = (id, pregunta, idForm) => {
    console.log("onPressNo");
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: false,
    }));

    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: pregunta,
      Opcion: 0,
      Texto: null,
      IdParteCuerpo: null,
      IdForm: idForm + 1,
      Orden: id,
    };
    verificarNoIguales(nuevaRespuesta);
    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
  };

  const continuarForm = () => {
    console.log(arrayRespuestas);
    arrayRespuestas.forEach((respuesta) => {
      console.log(respuesta);
      axios.post('http://localhost:3000/Respuesta', respuesta)
        .then((res) => {
          console.log('Respuestas enviadas con éxito');
        })
        .catch((error) => {
          console.log('Error al agregar las respuestas a la base de datos', error);
        });
    });

    if (pesatañaForm !== 2) {
      setPaginaForm(2);
      setTituloForm("EVALUACIÓN NO MOTORA");
    } else {
      navigation.navigate("Home");
    }
  };

  const cambiarPagina = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloForm}</Text>
      <Button title="aca luki" onPress={cambiarPagina}></Button>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {preguntas.map((pregunta) => (
          <View key={pregunta.Id} style={styles.preguntaContainer}>
            <Text style={styles.clasePregunta}>{pregunta.Texto}</Text>
            {/*                                                         BOTONES                                                                                */}
            <View style={styles.claseBotonesContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => onPressSi(pregunta.Id, pregunta.Texto, pregunta.IdForm)}>
                  <Text style={styles.buttonText}>Si</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => onPressNo(pregunta.Id, pregunta.Texto, pregunta.IdForm)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
            );
            {segundaPregunta[pregunta.Id] && (
              <View style={styles.inputContainer}>
                <Input id={pregunta.Id} placeholder={pregunta.preguntaHabilitada} onChange={handleInputChange} />
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
  button: {
    paddingVertical: 4,
    paddingHorizontal: '10%',
    margin: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Formulario;