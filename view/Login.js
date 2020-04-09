import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as Google from "expo-google-app-auth";

const config = {
  // Kevin's android and ios client id's
  androidClientId: "328874978995-2lapjgofl201415ft9uri774rh98vedd.apps.googleusercontent.com",
  iosClientId: "328874978995-9973qhi84grtd824po6uc0o99ke4lh6k.apps.googleusercontent.com",
  scopes: ["profile", "email"],
}

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      email: "",
      photoUrl: "",
      accessToken: "",
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync( config )
      if (result.type === "success") {
        console.log(result.user);
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email,
          accessToken: result.accessToken,
        })
      } else {
        console.log("cancelled")
      }
    } catch ( e ) {
      console.log("error", e)
    }
  }
  signOut = async () => {
    if (this.state.signedIn) {
      console.log("signing out")
      /* Log-Out */
      let accessToken = this.state.accessToken
      await Google.logOutAsync({ accessToken, ...config }).then(() => {
        this.setState({
          signedIn: false,
          name: "",
          email: "",
          photoUrl: "",
          accessToken: "",
        })
      });
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
      <Text>Test</Text>
      {this.state.signedIn || <Text>Not logged in</Text>}
      {this.state.signedIn && 
        <View><Text>This user is logged in</Text>
        <Text>{this.state.name}</Text>
        <Image style={styles.image} source={{uri:this.state.photoUrl}}/></View>
      }
      <Button title="Go to Map"onPress={() => this.props.navigation.navigate('Map')} />
      {this.state.signedIn 
        && <Button title="Sign Out"onPress={()=>{
          Alert.alert(
            'Sign Out',
            'Are you sure you want to log out?',
            [
              {text: 'Cancel, keep me logged in', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Sign me out!', onPress: this.signOut},
            ],
            { cancelable: true }
          )
        }} /> 

        || <Button title="Sign In"onPress={this.signIn} />
      }
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})