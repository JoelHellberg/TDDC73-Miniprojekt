import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";

export default function PasswordStrengthMeter() {

    const [text, setText] = useState(''); // Skapa en state för att hantera input-värdet

  return (

    
    <View style={styles.container}>
        <Text>"PasswordStrengthMeter" SDK testas nedanför:</Text>
        <TextInput
                style={styles.textInput}
                placeholder="Write your password"
                placeholderTextColor="grey"
                value={text}
                onChangeText={setText} // Uppdatera state vid textförändring
                keyboardType="default" // Ändra till "numeric", "email-address", etc., om nödvändigt
            />
    </View>
  );
}

const styles = StyleSheet.create({

    container:{
    alignItems: 'center'// Centrera horisontellt
    },
    //Styling för inputfältet
     textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        padding: 10,
        borderRadius: 5,
    },
  });