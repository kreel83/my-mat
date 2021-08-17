import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

export default function Register()  {
    const [identifiant, setIdentifiant] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [valeur, setValeur] = useState("test");



    const onPressRegister = () => {
      var data = new FormData();
      data.append('prenom', prenom )
      data.append('nom', nom )
      data.append('identifiant', identifiant )
      data.append('password', password )
      fetch('http://kreel.synology.me/mat-api/public/api/register', {
        method: 'post',
        body: data

      }).then(response => response.json()).then((data) => {
        setValeur(data.result)
      })
      }

        return (
            <View style={styles.container}>
            <Text>Connexion</Text>
            <TextInput
                placeholder="Nom"
                style={styles.input}
                onChangeText={setNom}
                value={nom}
            />
            <TextInput
                placeholder="Prenom"
                style={styles.input}
                onChangeText={setPrenom}
                value={prenom}
            />
            <TextInput
                placeholder="identifiant"
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

            <Button
                onPress={onPressRegister}
                title="S'enregistrer"
                color="#845487"
                onPress={() => onPressRegister() }
            />
            <Text>
                {valeur}
            </Text>
            <StatusBar style="auto" />
            </View>

        )


}

        const styles = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            },
            input: {
              height: 40,
              width: 250,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              color: "white",
              backgroundColor: "rgb(22,16,76)"
            },
          });
