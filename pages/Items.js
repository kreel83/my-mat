import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {Animated, StyleSheet, Text, View, Image, FlatList, TextInput, Button} from "react-native"
import React, { useState } from 'react';
import {doGetBlob} from "../utils/blob";
import {Dimensions} from 'react-native';
import {getData} from "../utils/storage";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default function Items({route, navigation}) {

    Array.prototype.next = function() {
        if (!((this.current + 1) in this)) return false;
        return this[++this.current];
    };



    const navigator = (sens, sectionid) => {
        getData().then((resultat) => {
            fetch('http://kreel.synology.me/mat-api/public/api/items?api_token=' + resultat+ '&sens=' +sens + '&section_id=' + sectionid, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +resultat
                },
                body: {
                    api_token: resultat,
                    section_id: sectionid,
                    sens: sens
                }
            }).then(response => response.json()).then((response) => {
                console.log(response)
                setItems(response.items[response.section.id])
                setSectionrec(response.section)
                console.log(response.items[response.section_id], response.section.id)
            })

        })
    }

    function onSwipeLeft(gestureState, sectionid) {
        navigator('next', sectionid);

    }

    function onSwipeRight(gestureState, sectionid) {
        navigator('previous', sectionid);

    }


    const onChooseItem = (id) => {
        console.log(enfant.id)
        getData().then((resultat) => {
            fetch('http://kreel.synology.me/mat-api/public/api/item?api_token=' + resultat+'&enfant=' + enfant.id+'&item=' + id , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +resultat
                },
                body: {
                    api_token: resultat,
                    id: id,
                    enfant: enfant.id
                }
            }).then(response => response.json())
                .then((response) =>  {
                    console.log(response)
                    navigation.navigate('Item', {
                        notifications: response.notifications,
                        enfant: enfant,
                        item: id

                    })
                })
        })




    }

    const { enfant, liste, section} = route.params;




    const [sectionrec, setSectionrec] = useState(section)
    const [items, setItems] = useState(liste[sectionrec.id])
    var width = Dimensions.get('window').width; //full width
    return (

        <View style={styles.container}>
            <Text style={{
                color: 'green',
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 30
            }} >{enfant.nom}</Text>
            <Text style={{
                color: sectionrec.color,
                fontSize: 20,
                textAlign: 'center',
                marginBottom: 30
            }} >{sectionrec.name}</Text>
            <GestureRecognizer
                onSwipeLeft={(state) => onSwipeLeft(state, sectionrec.id)}
                onSwipeRight={(state) => onSwipeRight(state, sectionrec.id)}
            >
            <FlatList style={{width: width}}
                      data={items}
                      keyExtractor={item => item.id.toString()}

                      renderItem={({item}) => <Text
                          onPress={(item) => onChooseItem(item.id)}
                          style={styles.item}>{item.name}

                      </Text>}
            />

            </GestureRecognizer>
            <StatusBar style="auto" />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {

    },
    square: {
        width: 150,
        height: 150,
        backgroundColor: '#28b5b5',
        marginTop: 22,
    },
    titre: {
        fontSize: 60,
        textAlign: 'center',



    },
    item: {
        padding: 10,
        fontSize: 14,
        height: 64,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        color: 'gray'
    },
});
