import React from 'react';
import styles from '../styles'
import { Button, Text, View } from 'react-native';
import { Header, ContactBlock } from '../components/UsefulComponents'

const ContactScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={{flexDirection:'row'}}>
        <Button
          title="Go to About"
          onPress={() =>
            navigation.navigate('About')
          }
        />
      </View>

      <Header text="Contact" />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.paragraphTextLarge}>
          In order to contact me, I can be reached via all of the following platforms
        </Text>
        <View style={styles.rowContainer}>
          <ContactBlock name="LinkedIn" link="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Symbol.png" contact_id="Lisandro Mayancela" />
          <ContactBlock name="Gmail" link="https://logos-world.net/wp-content/uploads/2020/11/Gmail-Logo-700x394.png" contact_id="lmayancela08@brandeis.edu" />
          <ContactBlock name="Instagram" link="https://logos-world.net/wp-content/uploads/2020/04/Instagram-icon-Logo-2016-present-700x394.png" contact_id="@lisandromayancela" />
        </View>
      </View>

    </View>
  );
}

export default ContactScreen;
