import React, { useState } from 'react';
import styles from '../styles';
import { Button, Text, View, Image, TextInput } from 'react-native';
import { Header } from '../components/UsefulComponents';
import PokeHomeInput from '../components/PokeHomeInput';

const HomeScreen = ({ navigation }) => {

  const pokeapiCallback = (apiData) => {
    navigation.navigate('Battle', {
      data: apiData,
    });
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection:'row'}}>
        <Button
          title="Go to About"
          onPress={() =>
            navigation.navigate('About')
          }
        />
        <Button
          title="Contact"
          onPress={() =>
            navigation.navigate('Contact')
          }
        />
      </View>

      <Header text='PokeCalc'/>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.paragraphTextLarge}>
          Welcome to the Pokemon damage calculator! Please enter the information
          below to get started:
        </Text>
        <PokeHomeInput parentCallback = {pokeapiCallback} />
      </View>
    </View>
  );
}

export default HomeScreen;
