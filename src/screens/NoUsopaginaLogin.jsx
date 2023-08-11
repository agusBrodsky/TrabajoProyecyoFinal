import React from 'react'
import {View,Text,TextInput,StyleSheet,Image,ImageBackground} from 'react-native'
import ImLogin from '../../assets/imLogin.png'
import Logo from '../../assets/logo.png'
import Input from '../components/Input.jsx'
const NoUsopaginaLogin = () =>{
    return(
        <View style={styles.containter}>
            <ImageBackground source={ImLogin} resizeMode="cover" style={styles.imagenFondo}>
            <Text>Hola</Text>
                <Image style={styles.imagen} source={Logo}></Image>
            </ImageBackground>
            <Input placeholder="Usuario o correo electronico"/>
            <Input placeholder="contraseña"/>
            </View>
    )
} 

const styles = StyleSheet.create({
    containter:{
        marginTop:55,
    },
    input:{
        top:'15%',
        left:'10%',
        borderWidth:3,
        color:'black',
        fontSize:25,
        width:'70%',
        height:55,
        margin:15
    },
    imagenFondo:{
        
        width:'100%',
        maxWidth:450,
        height:'100%',
        maxHeight:300
    },
    imagen:{
        
        width:'100%',
        maxWidth:200,
        height:'100%',
        maxHeight:200,
        top:'60%',
        left:'27%'
    }
})
export default NoUsopaginaLogin
