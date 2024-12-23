import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function PasswordStrengthMeter() {
    const [password, setPassword] = useState<string>(''); // Typ för lösenord
    const [strength, setStrength] = useState<number>(0);  // Typ för styrka

    // Funktion för att utvärdera styrkan på lösenordet
    const evaluateStrength = (input: string): number => {
        let score = 1;

        if (input.length >= 8) score += 1; // Minimilängd
        if (/[A-Z]/.test(input)) score += 1; // Stora bokstäver
        if (/[0-9]/.test(input)) score += 1; // Siffror
        if (/[^A-Za-z0-9]/.test(input)) score += 1; // Specialtecken

        // Om användaren börjar skriva, minst svag styrka (1)
        return input.length > 0 ? Math.max(score, 1) : 0;
    };

    // Uppdaterar lösenord och styrka direkt vid textändring
    const handlePasswordChange = (input: string): void => {
        setPassword(input);
        setStrength(evaluateStrength(input));
    };

    // Funktion för att bestämma färgen på baren
    const getStrengthColor = (): string => {
        switch (strength) {
            case 1: return 'black';
            case 2: return 'red';
            case 3: return 'orange';
            case 4: return 'yellow';
            case 5: return 'green';
            default: return 'gray';
        }
    };

    const getFeedbackText = () => {

        if( strength === 0){
            return "Your password must be 8 characters";
        }else{
            "Nej";
        }
        return "Hello, React Native!";
      };


    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Password Strength Meter</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Write your password"
                placeholderTextColor="grey"
                value={password}
                onChangeText={handlePasswordChange} // Uppdaterar lösenord och styrka
                secureTextEntry={true}
            />


             <Text style={styles.feedbackStatus}>
                {strength === 1
                    ? "Too short"
                    : strength ===2
                    ? "Weak"
                    : strength === 3
                    ? "Moderate"
                    : strength === 4
                    ? "Strong"
                    : strength === 5
                    ? "Very Strong"
                    : "Enter a password"}
            </Text>
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.strengthBar,
                        { width: `${strength * 20}%`, backgroundColor: getStrengthColor() }
                    ]}
                />
            </View> 

            <View style = {styles.feedbackTextContainer}>
            <Text style = {styles.feedbackText}>{getFeedbackText()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        marginTop: 200,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    barContainer: {
        width: '80%',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    strengthBar: {
        height: '100%',
        borderRadius: 5,
    },
    feedbackStatus: {
        color:"black",
        marginTop: 5,
        fontSize: 16,
        height:20,
        marginBottom: 5,
    },
    test:{
        height:10,
        backgroundColor: "grey",

    },
    feedbackTextContainer: {
        justifyContent: 'center',   // Centrerar innehållet vertikalt
        alignItems: 'center',       // Centrerar innehållet horisontellt
        padding: 20,
        width: 250,                 // Sätt en specifik bredd på View
        height: 70,                // Sätt en specifik höjd på View
        marginTop: 20,
        backgroundColor: 'orange',
        borderRadius: 5,
      },
      feedbackText: {
        textAlign: 'center',        // Centrerar texten horisontellt inom Text-komponenten
        fontSize: 10,                // Justera textstorleken om det behövs
        color: 'black',              // Sätt textfärgen för att kontrastera mot bakgrunden
      },
});
