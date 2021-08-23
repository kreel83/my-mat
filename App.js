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





export default function App() {





    function Log() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Register" component={Register} />
            </Tab.Navigator>
        );
    }

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
          initialRouteName="Log">
        <Stack.Screen name="Log" component={Log} options={{
          title: 'My home',
        }} />

        <Stack.Screen name="Main" component={Main} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}






