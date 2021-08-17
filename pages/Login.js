import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {getData, storeData} from "../utils/storage";

export default function Login({navigation}) {
    const [identifiant, setIdentifiant] = useState("mj@test.fr");
    const [password, setPassword] = useState("1234");
    const [valeur, setValeur] = useState("test2");



    const onPressLogin = () => {
        var data = new FormData();

        data.append('email', identifiant)
        data.append('password', password)
        console.log(data)
        fetch('http://kreel.synology.me/mat-api/public/api/login', {
            method: 'post',
            body: data

        }).then(response => response.json())
            .then((item) => {
                setValeur(item.result)

                storeData(item.result)
                getData().then((resultat) => {
                    fetch('http://kreel.synology.me/mat-api/public/api/enfants?api_token=' + resultat, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' +resultat
                        },
                        body: {
                            api_token: resultat
                        }
                    }).then(response => response.json())
                        .then((response) => {

                            console.log('test', response.result)
                            navigation.navigate('ListeEnfants', {
                                liste: response.result
                            })
                        })
                })
            })
    }


    return (
        <View style={styles.container}>
            <Text>Connexion</Text>
            <TextInput
                placeholder="identifiant"
                textContentType="emailAddress"
                style={styles.input}
                onChangeText={setIdentifiant}
                value={identifiant}
            />
            <TextInput
                placeholder="mot de passe"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onPressLogin}
            >
                <Text>Se connecter</Text>
            </TouchableOpacity>

            <Button

                title="S'enregistrer"

                onPress={() => navigation.navigate('Register')}
            />
            <Text>
                {valeur}
            </Text>
            <StatusBar style="auto"/>
        </View>

    )


}

const styles = StyleSheet.create({
    button: {
        width: '100px',
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#009387",
        color: 'white'
    },
});


