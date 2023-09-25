import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

//Her oprettes en komponent, som returnerer en tekstkomponent med teksten "Home"
function HomeScreen({prop}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop}</Text>
        </View>
    );
}

export default HomeScreen

//CSS styling til brug i komponenten
const styles = StyleSheet.create({
    container: {
        borderColor: 'grey',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
    },
    text: {
        fontSize: 20,
    },
});