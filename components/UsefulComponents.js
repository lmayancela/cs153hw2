import React from 'react';
import styles from '../styles'
import { Text, View, Image } from 'react-native';

const Header = (props) => {
  return (
    <View>
      <Text style={styles.headerText}> {props.text} </Text>
      <Image
        style= {styles.imageDimensions}
        source= "https://i.ibb.co/7rpW9Gw/pokeball.png"
        alt = "pokeball"
      />
    </View>
  );
}

const ContactBlock = (props) => {
  return(
    <View style={{alignItems: 'center'}}>
      <Text style={styles.paragraphTextSmall}> {props.name} </Text>
      <Image
        style= {styles.contactImage}
        source= {props.link}
        alt = "app_image"
      />
      <Text style={styles.paragraphTextSmall}> {props.contact_id} </Text>
    </View>
  );
}

const Loading = () => {
  return(
    <View>
      <Text style={styles.paragraphTextLarge}> Loading... </Text>
    </View>
  )
}



export {Header, ContactBlock, Loading}
