import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';

import ListeEnfants from './ListeEnfants';
import Enfant from './Enfant'
import Items from "./Items";





export default function Main() {







    function Listing() {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="ListeEnfants" component={Log}  />
            </Drawer.Navigator>
        )}

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#009387'
                    }
                }}
                initialRouteName="ListeEnfants">

                <Stack.Screen name="Enfant" component={Enfant} />
                <Stack.Screen name="Items" component={Items} />
                <Stack.Screen name="ListeEnfants" component={ListeEnfants} initialParams={{ liste: 'test' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}






