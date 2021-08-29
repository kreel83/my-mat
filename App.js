import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
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
import Deconnexion from "./pages/Deconnexion";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {getData} from "./utils/storage";





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



    const [token, setToken] = useState(null)
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const Drawer = createDrawerNavigator();

    getData().then((data) =>  {
        setToken(data)
    })


  return (
    <NavigationContainer independent={true}>


                    {(token == null  ) ? (
                        <>
                        <Stack.Navigator>
                            <Stack.Screen name="Log" component={Log} options={{
                                title: 'My home',
                            }}/>



                        </Stack.Navigator>
                        </>
                        ) : (
                        <>
                        <Drawer.Navigator>
                        <Drawer.Screen name="Main" component={Main} initialParams={{token: token }} />
                        <Drawer.Screen name="Correspondance" component={Correspondance} />
                        <Drawer.Screen name="Evenement" component={Evenement} />
                        <Drawer.Screen name="Parametre" component={Parametre} initialParams={{liste: 'test'}}/>
                            <Drawer.Screen name="ListeEnfants" component={ListeEnfants} />
                            <Drawer.Screen name="Deconnexion" component={Deconnexion} />
                        </Drawer.Navigator>

                        </>

                        )
                    }



    </NavigationContainer>

  );
}






