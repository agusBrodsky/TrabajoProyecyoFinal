import React, { useEffect, useState } from 'react';
import { Text, View, Alert, StyleSheet, ScrollView, TouchableNativeFeedback, Button } from 'react-native';
import NavBar from '../components/NavBar';
import repositories from '../data/repositories';
import Input from '../components/Input';
import axios from 'axios';

const Formulario = () => {
  const [data,setData] =useState(null);  
  const [preguntas, setPreguntas] = useState({});
  const [border, setBorder] = useState(false);
  //FETCH
  const [isLoading, setIsLoading] = useState(true);
  

  const onPressSi = (id,pregunta) => {
    setPreguntas((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: true,
    }));

    // FUNCION AXIOS

      axios.get('http://localhost:3000/Pregunta')
      .then(res =>{
          setIsLoading(false);
          console.log("chivatoo");
        })
        .catch((error) => {
          console.log("estamos en error!");
          console.log(error);
          setIsLoading(false);
        });

  };

  const onPressNo = (id) => {
    setPreguntas((prevPreguntas) => ({
      ...prevPreguntas,
      [id]: false,
    }));
  };

  const BotonVerde = ({ id, pregunta }) => {
    return (
      <TouchableNativeFeedback onPress={() => onPressSi(id,pregunta)}>
        <View style={[styles.claseBoton, styles.verdeBoton]}>
          <Text style={styles.botonTexto}>Si</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  const BotonRojo = ({ id }) => {
    return (
      <TouchableNativeFeedback onPress={() => onPressNo(id)}>
        <View style={[styles.claseBoton, styles.rojoBoton]}>
          <Text style={styles.botonTexto}>No</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <NavBar textoInicio='Helpark' />

      <Text style={styles.titulo}>EVALUACIÓN MOTORA</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {repositories.map((repo) => (
          <View key={repo.id} style={styles.claseNoSeMeOcurre}>
            <Text style={styles.clasePregunta}>{repo.pregunta}</Text>
            <View style={styles.claseBotonesContainer}>
              <BotonVerde id={repo.id} pregunta={repo.pregunta}/>
              <BotonRojo id={repo.id} pregunta={repo.pregunta}/>
            </View>
            {preguntas[repo.id] && (
              <View style={styles.inputContainer}>
              <Input placeholder={repo.preguntaHabilitada}></Input>
              </View>
            )}
          </View>
        ))}
        <View style={styles.continuarContainer}>
            <Button title="Continuar" onPress={() => {}} />
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
  claseBoton: {
    // ACAAAA
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  titulo: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 35,
  },
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
  textoAdicional:{
    fontSize:20
  },
  inputContainer:{
    alignItems:'center',
  },
  continuarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default Formulario;