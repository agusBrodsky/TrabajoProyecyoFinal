import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import axios from 'axios';
import { format } from 'date-fns';
// FALTA HACER EL UPDATE, YA SE MUESTRAN LAS RESPUESTAS ANTIGUAS Y LOS INPUTS ANTAS PIOLA
const Formulario = ({ route}) => {
  const navigation = useNavigation();
  const [segundaPregunta, setSegundaPregunta] = useState({}); // ARRAY RESPUESTAS
  const [preguntas, setPreguntas] = useState([]); // ARRAY DE PREGUNTAS INICIALES
  const [pesatañaForm, setPaginaForm] = useState(1);
  const [tituloForm, setTituloForm] = useState("EVALUACIÓN MOTORA");
  const [arrayRespuestas, setArrayRespuestas] = useState([]); // ARRAY DE RESPUESTAS!!
  const [valorInput, setInput] = useState("");
  const [pip, setPip] = useState(true);
  const [IdForm, setIdForm] = useState();
  const [idUser, setUserId] = useState(null);
  const [selectedButtons, setSelectedButtons] = useState(Array(preguntas.length).fill(null));
  const [respEditar, setRespEditar] = useState(null); // arrayRespuestas para editar!!
  const editar = route.params.editar;
  useEffect(() => { 
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("idUsuario: "+storedUserId);
    }
    console.log(editar);
  }, []);
  
  
  function actualizarTexto(id, value) {
    const actualizado = arrayRespuestas.map(resp => {
      if (resp.Orden === id) {
        return { ...resp, Texto: value };
      }
      return resp;
    });
    setArrayRespuestas(actualizado);
  }
  const handleInputChange = (value, id_r) => {
      console.log(value,id_r);
      setInput(value);
      actualizarTexto(id_r, value);
    };

  useEffect(() => { // ESTE USE EFFECT TRAE LAS PREGUNTAS O LAS RESPUESTAS DEL FORM DEPENDE DEL CASO!!
    if (editar) {
      // Lógica para cargar las respuestas del formulario
      // y actualizar el estado arrayRespuestas con esas respuestas.
      console.log("estas en edit!!");
        const today = new Date();
        const fecha = format(today, 'yyyy-MM-dd')
      
        axios.get(`http://localhost:3000/getLastRespuesta/${fecha}/${idUser}`) // FUNCION QUE TRAE EL ULTIMO FORMULARIO (las respuestas) EN CASO DE QUE ESTE RESUELTO!!
        .then((res) => {
          console.log(res.data); 
          setRespEditar(res.data);
          
          // este codigo es para marcar los botones, actualiza el segundaPregunta en base a las respuestas del formulario antiguo. 
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
              handleInputChange(respuesta.Texto,respuesta.Orden)
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

    const fechaActual = new Date(); 
    console.log(texto);
    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: texto,
      Opcion: 1,
      Texto: valorInput !== "" ? valorInput : null,
      IdParteCuerpo: null,
      Orden: idP,
      IdUsuario: idUser, 
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
    const fechaActual = new Date();
    const nuevaRespuesta = {
      Id: null,
      TextoPregunta: texto,
      Opcion: 0,
      Texto: valorInput !== "" ? null : null,
      IdParteCuerpo: null,
      Orden: idP,
      IdUsuario: idUser, 
      Fecha: fechaActual.toISOString(), 
    };
    verificarNoIguales(nuevaRespuesta);
    setArrayRespuestas((prevRespuestas) => [...prevRespuestas, nuevaRespuesta]);
    console.log(arrayRespuestas);
  };

  const verificarNoIguales = (nuevaRespuesta) => { // Funcion para chequear que no haya repetidos!
    setArrayRespuestas((prevRespuestas) => {
      return prevRespuestas.filter((respuesta) => {
        return respuesta.Orden !== nuevaRespuesta.Orden &&
          respuesta.TextoPregunta !== nuevaRespuesta.TextoPregunta;
      });
    })
    let idRespuestaRepetida = null;
    arrayRespuestas.map((objeto) => { // objeto es la respuesta en cada ciclo!

    })
  }
  const updateRespuestas = ()=>{
    arrayRespuestas.forEach((respuesta) => {
      axios.put('http://localhost:3000/RespuestaUpdate/', respuesta)
      .then((res)=>{
        console.log("listo!!");
        console.log(res.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    });
  }
  const continuarForm = () => { // funcion para guardar/actualizar respuestas del formulario.
    let veridicojeje = true;
    console.log("Continuar Form");
    console.log(arrayRespuestas);
    if (editar) {  
      // actualizar!
      console.log("estamos en edit!!");
      updateRespuestas(); // funcion que hace el update.
    }
    else { // agrega las respuestas a la bdd.
      arrayRespuestas.forEach((respuesta) => {
        console.log("las respuestas " +respuesta);
        axios.post('http://localhost:3000/Respuesta', respuesta)
          .then((res) => {
            console.log('Respuestas enviadas con éxito');
            veridicojeje = true;
          })
          .catch((error) => {
            console.log('Error al agregar las respuestas a la base de datos', error);
            veridicojeje = false;
          })

      });
    }
    if (false) { // burocracia!!
      setPaginaForm(2);
      setTituloForm("EVALUACIÓN NO MOTORA");
    } else {
      navigation.reset({
        index: 0, // Define el índice de la nueva pantalla en la pila (en este caso, la primera pantalla)
        routes: [{ name: 'HomeNavigator' }]
      });
    }
  };

  const cambiarPagina = () => { // burocracia!!
    navigation.navigate("Login");
  };
  const cambiarPagina1 = () => { // burocracia!!
    navigation.navigate("VerHistorialMedico");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloForm}</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {preguntas.map((pregunta) => (
          <View key={pregunta.Id} style={styles.preguntaContainer}>
            <Text style={styles.clasePregunta}>{pregunta.Texto}</Text>
            {/*------------------------------------------------------------------- BOTONES  ------------------------------------------------------------------------------*/}
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
                {
                // chequear esto!!
                (!editar) ? <Input id={pregunta.Id} textoArriba={pregunta.preguntaHabilitada}textoFijo="" onChange={handleInputChange} /> : <Input id={pregunta.Id} textoFijo={respEditar[pregunta.Id-1].Texto} onChange={handleInputChange} />
                }
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