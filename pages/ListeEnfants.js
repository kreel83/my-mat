import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,FlatList, TextInput, Button} from "react-native"
import React from 'react';
import { Dimensions } from 'react-native';
import {getData} from "../utils/storage";


export default function ListeEnfants({route, navigation}) {





  const onChooseEnfant = (id) => {

      console.log(id)
      getData().then((resultat) => {
          fetch('http://kreel.synology.me/mat-api/public/api/enfant?api_token=' + resultat+'&id=' + id, {
              method: 'post',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' +resultat
              },
              body: {
                  api_token: resultat,
                  id: id
              }
          }).then(response => response.json())
              .then((response) =>  {
                    console.log(response)
                  navigation.navigate('Enfant', {
                      element: response.enfant
                  })
              })
      })
  }

  // const { liste} = route.params;
  // console.log('liste', liste)

  var width = Dimensions.get('window').width; //full width
    return (
        <View style={styles.container}>

        {/* <FlatList style={{width: width}}
        data={liste}
        keyExtractor={item => item.id.toString()}

        renderItem={({item}) => <Text
        onPress={() => onChooseEnfant(item.id)}
        style={styles.item}>{item.nom}

        </Text>}
      /> */}


        <StatusBar style="auto" />
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
  });
