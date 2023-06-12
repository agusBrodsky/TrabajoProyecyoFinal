import React from 'react';
import { Text, TouchableNativeFeedback, View,Alert,StyleSheet } from 'react-native';
import NavBar from '../components/NavBar'; 

const Home = () =>{
    return(
        <View style={styles.container}>
        <NavBar textoInicio='Home'></NavBar>
        <Text>No empezado</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        textAlign:'center'
    }
})
export default Home