import React, {useState} from 'react';
import {Button,Text, View, TextInput, ActivityIndicator, StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUpForm() {
    //Her oprettes en state-variabel, som sættes til at være en tom streng ved default og som løbende opdateres med brugerens indtastning i inputfeltet
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    
    const auth = getAuth()
    //Her defineres brugeroprettelsesknappen, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Create user" />;
    };


    //Metoden herunder håndterer oprettelse af en ny bruger ved at anvende den prædefinerede metode, som stilles til rådighed af firebase 
    //createUserWithEmailAndPassword tager en mail og et password med som argumenter og foretager et asynkront kald, der eksekverer oprettelse af bruger i firebase https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    //Opstår der fejl under forsøget på oprettelse, vil der i catch blive fremsat en fejlbesked, som, ved brug af
      const handleSubmit = async() => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // bruger oprettet 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage)
        });
      }

      //I return oprettes en tekstkomponent, der angiver at dette er loginfrom
      //Dernæst er der to inputfelter, som løbeende sætter værdien af state-variablerne, mail og password.
      // Afslutningsvis, angives det at, hvis errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

//CSS styling til komponenten SignUpForm
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300
    },
    header: {
        fontSize: 40,
    },
});
//SignUpForm eksporteres til brug i App.js
export default SignUpForm