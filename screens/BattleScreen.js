import React, { useState } from 'react';
import styles from '../styles';
import { Button, Text, View, Image, TextInput } from 'react-native';
import { Header } from '../components/UsefulComponents';
import PokeInfo from '../components/PokeInfo';

const BattleScreen = ({ route, navigation }) => {
  const data_uncleaned = route.params.data;
  console.log(data_uncleaned)

  function cleanupData(data, data_type){
    const final = {}

    function parseType(data){
      const parsedData = []
      data.forEach(element => parsedData.push(element.type.name))
      return parsedData;
    }

    function parseStats(data){
      const parsedData = []
      data.forEach(element => parsedData.push(element.base_stat))
      return parsedData;
    }

    if(data_type==0){ // If the data is that of a pokemon
      Object.assign(final, {
        name: data.name,
        stats: parseStats(data.stats),
        type: parseType(data.types),
        sprite: data.sprites.front_default,
      });
    } else if (data_type==1){ // Else, the data is that of a move
      Object.assign(final, {
        name: data.name,
        damage_class: data.damage_class.name,
        power: data.power,
        type: data.type.name,
      });
    }
    return final
  }

  const pokemon1 = cleanupData(data_uncleaned.pokemon1, 0)
  const pokemon2 = cleanupData(data_uncleaned.pokemon2, 0)
  const move = cleanupData(data_uncleaned.move, 1)

  console.log(pokemon1);
  console.log(pokemon2);
  console.log(move);

  return(
    <View style={styles.container}>
      <Header text='Time to Fight!'/>
      <View style={{alignItems: 'center'}}>
        <View style={styles.rowContainer}>
          <PokeInfo data={JSON.stringify(pokemon1)} />
          <Image
            style= {styles.imageDimensions}
            source=  "https://i.ibb.co/Lgv9B7B/versus.png"
            alt = "versus"
          />
          <PokeInfo data={JSON.stringify(pokemon2)} />
        </View>
      </View>
    </View>
  );
}

export default BattleScreen;
