import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import Map from './Map';


export default class Home extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
      <Text>Test</Text>
      <Button
          title="Go to Map"
          onPress={() => this.props.navigation.navigate('Map')}
      />
      <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
      />

      </View>
    )
  }
}
