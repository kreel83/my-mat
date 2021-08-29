import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {getData, deleteData} from "../utils/storage";
import App from "../App";
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';







export default function Deconnexion() {
    const [deco, setDeco] = useState(null)
    useEffect(() => {


        deleteData().then((value) => {
            console.log(value)
            setDeco(true)
        })
    })







    return (
        <>
        {

        (deco == true) ? (
            <>
                <View>
                    <App />
                </View>
            </>
            ) : (
            <>
                <Text>coucou</Text>
            </>
            )
        }
            </>
            )





}
