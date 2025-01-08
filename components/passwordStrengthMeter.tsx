import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function PasswordStrengthMeter() {
    const [password, setPassword] = useState<string>(''); // Typ för lösenord
    const [strength, setStrength] = useState<number>(0);  // Typ för styrka

    // Funktion för att utvärdera styrkan på lösenordet
    const evaluateStrength = (input: string): number => {
        let score = 1;


        if (input.length >= 8) {
            if (/[A-Z]/.test(input)) score += 1; // Stora bokstäver
            if (/[0-9]/.test(input)) score += 1; // Siffror
            if (/[^A-Za-z0-9]/.test(input)) score += 1; // Specialtecken
            score += 1; // Baspoäng för att lösenordet är minst 8 tecken långt
        } else {
            score = 0; // Ingen poäng om lösenordet är kortare än 8 tecken
        }

        // Om användaren börjar skriva, minst svag styrka (1)
        return input.length > 0 ? Math.max(score, 1) : 0;
    };

        // Funktion för att utvärdera styrkan på lösenordet
        const evaluateFeedback = (input: string): string => {

            //Array för feedbacktexten
            const feedback = [];
            

            if (input.length < 8) {
                feedback.push("The password must be at least 8 characters long.");
            } else {
                if (!/[A-Z]/.test(input) && !/[0-9]/.test(input) && !/[^A-Za-z0-9]/.test(input)) {

                    feedback.push("Add at least one uppercase letter.");
                }
                if (!/[0-9]/.test(input)) {
                    feedback.push("Add at least one number.");
                }
                if (!/[^A-Za-z0-9]/.test(input)) {
                    feedback.push("Add at least one special character (e.g., @, #, !).");
                }
            
                if (feedback.length === 0) {
                    return "Good job! You created a very strong password!";
                }
            }
        
            return feedback.join(" ");
        }


    // Uppdaterar lösenord och styrka direkt vid textändring
    const handlePasswordChange = (input: string): void => {
        setPassword(input);
        setStrength(evaluateStrength(input));
    };

    // Funktion för att bestämma färgen på baren
    const getStrengthColor = (): string => {
        switch (strength) {
            case 1: return 'gray';
            case 2: return 'red';
            case 3: return 'orange';
            case 4: return 'yellow';
            case 5: return 'green';
            default: return 'gray';
        }
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
                secureTextEntry={false} //Döljer lösenordet
            />

<View style = {styles.feedbackTextContainer}>
<Text style = {styles.feedbackText}>{evaluateFeedback(password)}</Text>

</View>
        <View style = {styles.feedbackStrenghtContainer}>
            <Text style = {styles.feedbackStatus}>Password strength: </Text>
             <Text style={[styles.feedbackStatus, { color: getStrengthColor() }]}>
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
            </View>

            <View style={styles.strengthContainer}>
                <View
                    style={[
                        styles.strengthBar,
                        { width: `${strength * 20}%`, backgroundColor: getStrengthColor() }
                    ]}
                />
            </View> 
        </View>
    );
}

//Styling
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 20,
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
    strengthContainer: {
        width: '80%',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom:20,
        },
    strengthBar: {
        height: '100%',
        borderRadius: 5,
        },
    feedbackStatus: {
        marginTop: 5,
        fontSize: 16,
        height:20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    feedbackTextContainer: {
        justifyContent: 'center',   // Centrerar innehållet vertikalt
        alignItems: 'center',       // Centrerar innehållet horisontellt
        padding: 20,
        width: '80%',                 // Sätt en specifik bredd på View
        height: 70,                // Sätt en specifik höjd på View
        marginTop: 20,
        backgroundColor: 'orange',
        borderRadius: 5,
      },
      feedbackText: {
        textAlign: 'center',        // Centrerar texten horisontellt inom Text-komponenten
        fontSize: 16,                // Justera textstorleken om det behövs
        color: 'black',              // Sätt textfärgen för att kontrastera mot bakgrunden
        fontWeight: 'bold',
      },
      feedbackStrenghtContainer:{
        flexDirection: 'row',
        alignItems: 'center',
      }
});
