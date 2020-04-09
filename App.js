import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './view/Home';
import Map from './view/Map';
import Login from './view/Login';
import Facebook_Login from './view/Facebook_Login';
// import Register from './view/Register';

const RootStack = createStackNavigator(
  {
    NotUber: {
      screen: Map,
    },
    Login: {
      screen: Login,
    },
    Facebook_Login: {
      screen: Facebook_Login,
    },
    Register: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <PaperProvider>
      <AppContainer/>
    </PaperProvider>
  );
}

