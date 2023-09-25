import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
function SettingsScreen({prop}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{prop}</Text>
        </View>
    );
}
//Her eksporteres komponenten, så den kan benyttes i andre filer
export default SettingsScreen

//Styling til brug i Tattoo Screen
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'lightgrey',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height:'100%'
    },
    text: {
        fontSize: 20,
    },
});