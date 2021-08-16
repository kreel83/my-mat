import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, FlatList, TextInput, Button} from "react-native"
import React from 'react';
import {getData} from "../utils/storage";
import {Items} from '../pages/Items'


export default function Item({route, navigation}) {

    const { item, enfant, notifcations} = route.params;




    return (
        <View style={styles.container}>

            <Text style={styles.item}>{item.name}</Text>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'http://kreel.synology.me/mat-api/public' + item.image,
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
