
import React, { Component } from "react";
import LoginPage from '../screens/LoginPage/LoginPage';
import SignUpPage from '../screens/SignUpPage/SignUpPage';
import ListPage from '../screens/ListPage/ListPage';
import AddToListPage from '../screens/AddToListPage/AddToListPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppNavigator = ({ navigation }) => {

    React.useEffect(() => {
       
    }, []);

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
           <Stack.Navigator
                initialRouteName={"LoginPage"}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="SignUpPage" component={SignUpPage} />
                <Stack.Screen name="ListPage" component={ListPage} />
                <Stack.Screen name="AddToListPage" component={AddToListPage} />
            </Stack.Navigator>
        </NavigationContainer>
      );

};



export default AppNavigator;