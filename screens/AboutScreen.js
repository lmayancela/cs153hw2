import React from 'react';
import styles from '../styles'
import { Button, Text, View } from 'react-native';
import { Header } from '../components/UsefulComponents'

const AboutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={{flexDirection:'row'}}>
        <Button
          title="Contact"
          onPress={() =>
            navigation.navigate('Contact')
          }
        />
      </View>

      <Header text='About Me'/>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.paragraphTextLarge}>
          Welcome to PokeCalc, the app that allows you
          to calculate your best move in a Pokemon battle!
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.paragraphTextLarge}> How To Use </Text>
            <Text style={styles.paragraphTextSmall}>
              To use this app, you must first input the name and stats of both the attacking and defending pokemon.
              Then, you specify the name of the move that the attacking Pokemon will use and press submit!
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.paragraphTextLarge}> Future Plans </Text>
            <Text style={styles.paragraphTextSmall}>
              While the submit button still doesn't work, I plan on utlizing the pokemon api in order to obtain data
              about the given Pokemon and move so that I can perform the calculation to determine how much damage is done.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AboutScreen;
