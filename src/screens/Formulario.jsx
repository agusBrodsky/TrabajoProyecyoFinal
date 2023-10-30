import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import axios from 'axios';

const Formulario = ({ route, editar = true }) => {
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({}); // ARRAY RESPUESTAS
  const [preguntas, setPreguntas] = useState([]); // ARRAY DE PREGUNTAS INICIALES
  const [pesatañaForm, setPaginaForm] = useState(1);
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA");
  const [arrayRespuestas, setArrayRespuestas] = useState([]); // ARRAY DE RESPUESTAS!!
  const [valorInput, setInput] = useState("");
  const [pip, setPip] = useState(true);
  const [IdForm, setIdForm] = useState();
  const [id, setUserId] = useState(null);
  const [selectedButtons, setSelectedButtons] = useState(Array(preguntas.length).fill(null));

  useEffect(() => {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(storedUserId);
    }
  }, []);

  const handleInputChange = (value, id_r) => {
    console.log(value,id_r);
    setInput(value);
    actualizarTexto(id_r, value);
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

  useEffect(() => { // ESTE USE EFFECT TRAE LAS PREGUNTAS O LAS RESPUESTAS DEL FORM DEPENDE DEL CASO!!
    if (editar) {
      // Lógica para cargar las respuestas del formulario
      // y actualizar el estado arrayRespuestas con esas respuestas.
      console.log("entre jaja");
      axios.get('http://localhost:3000/Respuesta')
        .then((res) => {
          console.log(res.data);
          const respuestasGuardadas = res.data;
          const respuestasArray = []; // Array para almacenar las respuestas cargadas desde la API.
          const botonesSeleccionadosArray = Array(preguntas.length).fill(null); // Array para los botones seleccionados.

          respuestasGuardadas.forEach((respuesta) => {
            // Verificar la propiedad Opcion para determinar si la respuesta es "Sí" o "No".
            if (respuesta.Opcion) {
              respuestasArray.push(respuesta);
              botonesSeleccionadosArray[respuesta.Orden] = 'si';
              setSegundaPregunta((prevPreguntas) => ({
                ...prevPreguntas,
                [respuesta.Orden]: true,
              }));
              handleInputChange(respuesta.Texto,respuesta.Orden) // FALTA TERMINAR ESTO, ESTAMOS HACIENDO QUE SE EDITE UN FORMULARIO, Y TODA LA BOLA, FALTA QUE SE CARGUE EL TEXTO A LOS INPUTS  
            } else {
              respuestasArray.push(respuesta);
              botonesSeleccionadosArray[respuesta.Orden] = 'no';
              setSegundaPregunta((prevPreguntas) => ({
                ...prevPreguntas,
                [respuesta.Orden]: false,
              }));
            }
          });

          // Establecer el estado con las respuestas cargadas desde la API y los botones seleccionados.
          setArrayRespuestas(respuestasArray);
          setSelectedButtons(botonesSeleccionadosArray);
        })
        .catch((error) => {
          console.error('Error al cargar las respuestas guardadas:', error);
        });

    }
    else {

    }
    axios.get('http://localhost:3000/Pregunta')
      .then((res) => {
        console.log(res.data);
        const arrayPreguntas = res.data;
        setPreguntas(arrayPreguntas);
      });
  }, []);

  const onPressSi = (idP, texto) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [idP]: true,
    }));

    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    console.log(texto);
    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: texto,
      Opcion: 1,
      Texto: valorInput !== "" ? valorInput : null,
      IdParteCuerpo: null,
      Orden: idP,
      IdUsuario: id, // falta cambiar el user, por ahora siempre es 1
      Fecha: fechaActual.toISOString(),
    };
    verificarNoIguales(nuevaRespuesta);
    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
  };
  // -----------------------------------------------------                                                    ------------------------------------------------------------------------------------------------
  const onPressNo = (idP, texto) => {
    setSegundaPregunta((prevPreguntas) => ({
      ...prevPreguntas,
      [idP]: false,
    }));
    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: texto,
      Opcion: 0,
      Texto: valorInput !== "" ? valorInput : null,
      IdParteCuerpo: null,
      Orden: idP,
      IdUsuario: id, // falta cambiar el user, por ahora siempre es 1
      Fecha: fechaActual.toISOString(), // Agrega la fecha actual en formato ISO
    };
    verificarNoIguales(nuevaRespuesta);
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
  }
  const continuarForm = () => {
    let veridicojeje = true;
    console.log("Continuar Form");
    console.log(arrayRespuestas);
    if (editar) {
      // Logica para hacer el UPDATE!!
    }
    else {
      arrayRespuestas.forEach((respuesta) => {
        console.log(respuesta);
        axios.post('http://localhost:3000/Respuesta', respuesta)
          .then((res) => {
            console.log('Respuestas enviadas con éxito');
            veridicojeje = true;
            navigation.reset({
              index: 0, // Define el índice de la nueva pantalla en la pila (en este caso, la primera pantalla)
              routes: [{ name: 'Home' }],
            });
          })
          .catch((error) => {
            console.log('Error al agregar las respuestas a la base de datos', error);
            veridicojeje = false;
          })

      });
    }
    if (false) {
      setPaginaForm(2);
      setTituloForm("EVALUACIÓN NO MOTORA");
    } else {
      navigation.navigate("Home");
    }
  };

  const cambiarPagina = () => {
    navigation.navigate("Login");
  };
  const cambiarPagina1 = () => {
    navigation.navigate("VerHistorialMedico");
  }

  return (


    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloForm}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {preguntas.map((pregunta) => (
          <View key={pregunta.Id} style={styles.preguntaContainer}>
            <Text style={styles.clasePregunta}>{pregunta.Texto}</Text>
            {/*                                                         BOTONES                                                                                */}
            <View style={styles.claseBotonesContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: 'green',
                    borderWidth: selectedButtons[pregunta.Id] === 'si' ? 2 : 0
                  }
                ]}
                onPress={() => {
                  const updatedButtons = [...selectedButtons];
                  updatedButtons[pregunta.Id] = 'si';
                  setSelectedButtons(updatedButtons);
                  onPressSi(pregunta.Id, pregunta.Texto);
                }}
              >
                <Text style={styles.buttonText}>Si</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: 'red',
                    borderWidth: selectedButtons[pregunta.Id] === 'no' ? 2 : 0
                  }
                ]}
                onPress={() => {
                  const updatedButtons = [...selectedButtons];
                  updatedButtons[pregunta.Id] = 'no';
                  setSelectedButtons(updatedButtons);
                  onPressNo(pregunta.Id, pregunta.Texto);
                }}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>

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