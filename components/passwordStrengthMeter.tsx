import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from "react-native";

export default function PasswordStrengthMeter() {
    const [password, setPassword] = useState<string>(''); // Typ för lösenord
    const [strength, setStrength] = useState<number>(0);  // Typ för styrka

    // Funktion för att utvärdera styrkan på lösenordet
    const evaluateStrength = (input: string): number => {
        let score = 0;

        if (input.length >= 6) score += 1; // Minimilängd
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
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'green';
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
                secureTextEntry={true}
            />
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.strengthBar,
                        { width: `${strength * 25}%`, backgroundColor: getStrengthColor() }
                    ]}
                />
            </View>
            <Text style={styles.feedback}>
                {strength === 1
                    ? "Weak"
                    : strength === 2
                    ? "Moderate"
                    : strength === 3
                    ? "Strong"
                    : strength === 4
                    ? "Very Strong"
                    : "Enter a password"}
            </Text>
        </View>
    );
}

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
        marginBottom: 20,
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
    feedback: {
        marginTop: 10,
        fontSize: 16,
    },
});
