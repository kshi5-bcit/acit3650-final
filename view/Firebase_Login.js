import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View, Image, Button, Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class Firebase_Login extends Component {

	constructor(props) {
		super(props);
		this.state={
			signedIn: false,
			email: "",
			password: "",
			verify_password: "",
			errMessage: "",

		}
	}

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
}

 handleLogin = () => {
   firebase
     .auth() .signInWithEmailAndPassword(email, password)
     .then(() => this.props.navigation.navigate('NotUber'))
     .catch(error => this.setState({ errMessage: error.message }))
 }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
			<Text style={styles.registerTitle}>
				Log into your account
			</Text>
			<TextInput
			style={styles.textInput}
			label='Email address'
			placeholder='kevin@example.com'
			autoCapitalize='none'
		  	onChangeText={email => this.setState({ email })}
			value={this.state.email}
			/>
			<TextInput
			style={styles.textInput}
			secureTextEntry
			placeholder='Password'
			secureTextEntry={true}
			autoCapitalize='none'
			onChangeText={password => this.setState({ password })}
			value={this.state.password}
			/>
        <Button title="Login" color="#e93766" onPress ​={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress ​={() => this.props.navigation.navigate('SignUp')} style={{color:'#e93766', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}

	const styles=StyleSheet.create({
		registerTitle: {
		    fontSize:36,
		    color:"bbb",

		},
		container: {
		  flex: 1,
		  justifyContent: 'center',
		  alignItems: 'center'
		},
		textInput: {
		    height: 80,
		    fontSize:24,
		    width: '90%',
		    borderColor: '#9b9b9b',
		    borderBottomWidth: 4,
		    marginTop: 8,
		    marginVertical: 15
		  }
	})