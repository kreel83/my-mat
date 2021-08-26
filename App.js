import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from "./pages/Main";
import Correspondance from "./pages/Correspondances";
import Parametre from "./pages/Parametres";
import Evenement from "./pages/Evenements";
import ListeEnfants from "./pages/ListeEnfants";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function App() {


    const isData = async () => {
        try {
            const value = await AsyncStorage.getItem('@api_token')
            if (value !== null) {
                return value;
            }
            return false;
        } catch (e) {
            return false;
        }
    }



    function Log() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
        );
    }



    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();
    const data = isData()
  return (
    <NavigationContainer>


                    {(data == false) ? (
                        <>
                        <Stack.Navigator>
                            <Stack.Screen name="Log" component={Log} options={{
                                title: 'My home',
                            }}/>


                        <Stack.Screen name="App" component={App} />
                        </Stack.Navigator>
                        </>
                        ) : (
                        <>
                        <Drawer.Navigator>
                        <Drawer.Screen name="Main" component={Main} />
                        <Drawer.Screen name="Correspondance" component={Correspondance} />
                        <Drawer.Screen name="Evenement" component={Evenement} />
                        <Drawer.Screen name="Parametre" component={Parametre} initialParams={{liste: 'test'}}/>
                        <Drawer.Screen name="ListeEnfants" component={ListeEnfants} />
                        </Drawer.Navigator>
                        </>
                        )
                    }



    </NavigationContainer>
  );
}






