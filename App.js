import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

//Importere vores componenter fra components mappe
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';




const firebaseConfig = {
  apiKey: "AIzaSyBxE7tGL3Kp5_2HxaqjClu-tHQKZv21JNk",
  authDomain: "godkend1-d5d44.firebaseapp.com",
  projectId: "godkend1-d5d44",
  storageBucket: "godkend1-d5d44.appspot.com",
  messagingSenderId: "237109698969",
  appId: "1:237109698969:web:885d637b12bae396f3f308",
  measurementId: "G-BMCPK72B8F"
};

// Initialize Firebase if not already initialized

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  } else {
    console.log("Firebase not on!");
  }
 
  const auth = getAuth();

  //Her oprettes en listener, der observerer om brugeren er logget ind eller ej
  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
      //Hvis bruger er logget ind, så returneres brugerens uid og callback funktionen kaldes
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("Du er logget ind");
        // ...
      } else {
       //Hvis bruger ikke er logget ind, så returneres loggedIn: false og callback funktionen kaldes
        callback({loggedIn: false});
      }
    });
  }

  //Her oprettes en useEffect, der kalder onAuthStateChange funktionen
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes gæstekomponentsindhold, som er det første en bruger ser, hvis brugeren ikke er logget ind
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Opret eller Login med din firebase Email
          </Text>
          
          <Card style={{padding:20, margin: 20}}>
            <SignUpForm />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }




  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
