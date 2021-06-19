import React, { useState } from 'react';
import styles from '../styles'
import { Button, Text, View, Image, TextInput } from 'react-native';

const PokeInfo = (props) => {
  const data = JSON.parse(props.data);
  const name = data.name;
  const sprite_link = data.sprite;
  const types = data.type
  const [remainingEVs, setRemainingEVs] = useState(510);
  const [ inithp, initatk, initdef, initspatk, initspdef, initspd ] = data.stats;
  const [hp, setHP] = useState(0);
  const [atk, setAtk] = useState(0);
  const [def, setDef] = useState(0);
  const [spAtk, setSpAtk] = useState(0);
  const [spDef, setSpDef] = useState(0);
  const [spd, setSpd] = useState(0);


  function updateRemEVs(init, end){
    let difference = end - init;
    setRemainingEVs(remainingEVs-difference);
  }

  // Helper function to determine whether the user is inputting actual numeric values for the stats
  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  return(
    <View style={{alignItems: 'center'}}>
      <Text style={styles.paragraphTextSmall}> {name} </Text>
      <Image
        style= {styles.pokemonImage}
        source=  {sprite_link}
        alt = {name}
      />
      <View>
        <Text style={styles.paragraphTextSmall}> Distribute {name}'s EVs ({remainingEVs} left) </Text>

        <View style={styles.statBox}>
          <Text style={styles.statText}> HP: {inithp + Math.floor(hp/4)} </Text>
          <TextInput
            style = {styles.textBox}
            placeholder = "Enter HP EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(hp,0);
                setHP(0);
              } else if (isNumeric(text)) {
                updateRemEVs(hp,parseFloat(text));
                setHP(parseFloat(text));
              }
            }}
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}> Atk: {initatk + Math.floor(atk/4)} </Text>
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Attack EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(atk,0);
                setAtk(0);
              } else if (isNumeric(text)) {
                updateRemEVs(atk,parseFloat(text));
                setAtk(parseFloat(text));
              }
            }}
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}> Def: {initdef + Math.floor(def/4)} </Text>
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Defense EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(def,0);
                setDef(0);
              } else if (isNumeric(text)) {
                updateRemEVs(def,parseFloat(text));
                setDef(parseFloat(text));
              }
            }}
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}> Sp. Atk: {initspatk + Math.floor(spAtk/4)} </Text>
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Special Atk EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(spAtk,0);
                setSpAtk(0);
              } else if (isNumeric(text)) {
                updateRemEVs(spAtk,parseFloat(text));
                setSpAtk(parseFloat(text));
              }
            }}
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}> Sp. Def: {initspdef + Math.floor(spDef/4)} </Text>
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Special Defense EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(spDef,0);
                setSpDef(0);
              } else if (isNumeric(text)) {
                updateRemEVs(spDef,parseFloat(text));
                setSpDef(parseFloat(text));
              }
            }}
          />
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statText}> Spd: {initspd + Math.floor(spd/4)} </Text>
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Speed EVs"
            onChangeText = {text => {
              if (text.length == 0) {
                updateRemEVs(spd,0);
                setSpd(0);
              } else if (isNumeric(text)) {
                updateRemEVs(spd,parseFloat(text));
                setSpd(parseFloat(text));
              }
            }}
          />
        </View>

    </View>


    </View>
  );
}

export default PokeInfo
