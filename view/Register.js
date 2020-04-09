import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View, Image, Button, Alert } from 'react-native';

export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state={
			signedIn: false,
			email: "",
			password: "",
			verify_password: "",

		}
	}

	render() {
		const { navigation }=this.props;

		return (
			<View style={styles.container}>
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
			<TextInput
			style={styles.textInput}
			secureTextEntry
			placeholder='Verify Password'
			secureTextEntry={true}
			autoCapitalize='none'
			onChangeText={verify_password => this.setState({ verify_password })}
			value={this.state.verify_password}
			/>


			</View>
			)}
	}

	const styles=StyleSheet.create({
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