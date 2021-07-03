import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageDimensions: {
    width: 150,
    height: 150,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  contactImage: {
    borderRadius: 50,
    width: 75,
    height: 75,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pokemonImage: {
    width: 90,
    height: 90,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  rowContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 40,
    color: 'blue',
  },
  textContainer: {
    alignItems: 'center',
    width: 500,
  },
  paragraphTextLarge: {
    fontSize: 30,
  },
  paragraphTextSmall: {
    fontSize: 20,
  },
  textBox: {
    height: 30,
    width: 150,
    border: 'black',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
  },
  statBox: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBot: 20,
  },
  statText: {
    color: 'blue',
    fontSize: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 700,
  }
});

export default styles;
