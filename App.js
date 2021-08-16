import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Register from './pages/Register';
import ListeEnfants from './pages/ListeEnfants';
import Enfant from './pages/Enfant'
import Items from "./pages/Items";





export default function App() {

    function HomeScreen({navigation}) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }

    function SettingsScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }


    const Stack = createStackNavigator();
  return (
    <NavigationContainer>

      <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#009387'
            }
          }}
          initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          title: 'My home',
        }} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Enfant" component={Enfant} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="ListeEnfants" component={ListeEnfants} initialParams={{ liste: "test" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}






