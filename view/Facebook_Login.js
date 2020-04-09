import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';


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
    	await Facebook.initializeAsync(
    	     '1146369092376154',
    	  );

    	  const result = await Facebook.logInWithReadPermissionsAsync(
    	    { permissions: ['public_profile'] }
    	  );

    	  if (result.type === 'success') {
    	  	console.log(result)
    	    // Build Firebase credential with the Facebook access token.
    	    // const credential = firebase.auth.FacebookAuthProvider.credential(token);

    	    // Sign in with credential from the Facebook user.
    	    // firebase.auth().signInWithCredential(credential).catch((error) => {
    	    //   // Handle Errors here.
    	    // });
    	    // const response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
         //  Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          await fetch(`https://graph.facebook.com/me?fields=id,namepicture,email&access_token=${result.token}`).then(
          	response => {
          		console.log("inside the Then")
          		console.log(response)
          		console.log(response.picture)
          		console.log(response.json())
          		console.dir(response)
          	});
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
      await Google.logOutAsync({ accessToken, ...google_config }).then(() => {
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

        || <Button title="Sign In with Facebook"onPress={this.signIn} />
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