import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, FlatList, TextInput, Button} from "react-native"
import React from 'react';
import {getData} from "../utils/storage";
import {Items} from '../pages/Items'


export default function Enfant({route, navigation}) {

    const enfant = route.params.element;
    console.log(enfant.photo)
    const id = route.params.element.id
    const mois = ['janvier','février','mars','avril','mai','juin',"juillet",'aout','septembre','octobre','novembre','decembre'];
    const dateNaissance = enfant.ddn.split('-')
    const moisNaissance = mois[parseInt(dateNaissance[1]) - 1]

    const onPressItems = () => {
        getData().then((resultat) => {
            fetch('http://kreel.synology.me/mat-api/public/api/items?api_token=' + resultat
                + '&sens=origin&id='+ id
                + '&section_id=first'
                , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +resultat
                },
                body: {
                    api_token: resultat,
                    id: id,
                    section_id: 'first'
                }
            }).then(response => response.json())
                .then((response) =>  {
                    navigation.navigate('Items', {
                        liste: response.items,
                        section: response.section,
                        section_id: response.section_id,
                        enfant: enfant
                    })
                })
        })
    }


    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'http://kreel.synology.me/mat-api/public' + enfant.photo,
                }}
            />
            <View style={styles.mainContainer}>
            <Text style={styles.item}>{enfant.nom}</Text>
            <Text style={styles.item}>{enfant.prenom}</Text>
            <Text style={styles.cadreMail}>
                {enfant.mail.split(';').map((mail, index) => (
                    <Text key={index}>{mail}</Text>
                ))}
            </Text>

            <Text style={styles.cadre}>

                    <Text style={styles.date0}>{moisNaissance}</Text>
                    <Text style={styles.date1}>{dateNaissance[2]}</Text>
                    <Text style={styles.date2}>{dateNaissance[0]}</Text>

            </Text>



            <Button
                onPress={onPressItems}
                title="Voir les items"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            </View>
            <StatusBar style="auto"/>
        </View>

    )
}

const styles = StyleSheet.create({
    date0: {
        color: 'white',
        backgroundColor: 'red',
        padding: 12,
        width: '100%',
        textAlign: 'center',
        fontSize: 20
    },
    date1: {
       fontSize: 50
    },
    cadreMail: {
        marginTop: 15,
        padding: 10,
        borderColor: 'lightgrey'
    },
    cadre: {
        marginTop: 50,
        marginBottom: 30,
        borderWidth: 3,
        borderColor: 'red',
        height: 140,
        width: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#009387',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: 'white',
        height: '80%',
        width: '100%',
        borderTopLeftRadius: '75px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: "column"
    },
    item: {
        padding: 10,
        fontSize: 30,
        height: 44,
        textTransform: 'capitalize'
    },
    tinyLogo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    logo: {
        width: 66,
        height: 58,
    },
});
