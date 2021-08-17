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

            <Text style={styles.item}>{enfant.nom}</Text>
            <Text style={styles.item}>{enfant.prenom}</Text>
            <Text style={styles.item}>{enfant.mail}</Text>
            <Text style={styles.item}>{enfant.ddn}</Text>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'http://kreel.synology.me/mat-api/public' + enfant.photo,
                }}
            />
            <Button
                onPress={onPressItems}
                title="Voir les items"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <StatusBar style="auto"/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        textTransform: 'capitalize'
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    logo: {
        width: 66,
        height: 58,
    },
});
