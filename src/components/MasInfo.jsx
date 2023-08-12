import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MasInfo = ({ textFecha = "Error!", text = "Error!"}) => {
    return(
        <View style={styles.Container}>
            <Text >{textFecha}</Text>
            <Text style={styles.textito}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        width: '70%',
        margin:5,
        
    },
    textito: {
        borderWidth:2,
        borderRadius:5,
    },
    tamañoLetra: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'left',
    },
  });

export default MasInfo;