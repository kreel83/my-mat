import 'react-native-gesture-handler';
import React,{ useState, useEffect } from 'react';
import {getData, deleteData} from "../utils/storage";
import { StyleSheet, Text, View ,FlatList, TextInput, Button} from "react-native"


export default function Main({route}) {
    const token = route.params.token


    return (
        <>
            <h1>Menu principal</h1>
            <Text>{token}</Text>
        </>
    );
}






