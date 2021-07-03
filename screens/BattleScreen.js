import React, { useState } from 'react';
import styles from '../styles';
import { Button, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Header } from '../components/UsefulComponents';
import PokeInfo from '../components/PokeInfo';

const BattleScreen = ({ route, navigation }) => {
  const data = route.params.data;
  const atkteam = data.atkteam
  const defteam = data.defteam
  const [attacker, setAttacker] = useState({});
  const [defender, setDefender] = useState({});
  const [displayatk, setDisplayAtk] = useState(false);
  const [displaydef, setDisplayDef] = useState(false);
  console.log(data)

  const renderPokemonAttacker = ({item}) => {
    const selectPokemon = () => {
      setAttacker(item);
      setDisplayAtk(true);
    }

    return (
      <TouchableOpacity onPress = {selectPokemon} >
      <View style={{border:'thin solid red'}}>
        <Text>{item.name}</Text>
        <Image
          style= {styles.pokemonImage}
          source= {item.sprite}
          alt = {item.name}
        />
      </View>
      </TouchableOpacity>
    )
  }

  const renderPokemonDefender = ({item}) => {
    const selectPokemon = () => {
        setDefender(item);
        setDisplayDef(true);
    }

    return (
      <TouchableOpacity onPress = {selectPokemon} >
      <View style={{border:'thin solid blue'}}>
        <Text>{item.name}</Text>
        <Image
          style= {styles.pokemonImage}
          source= {item.sprite}
          alt = {item.name}
        />
      </View>
      </TouchableOpacity>
    )
  }

  return(
    <View style={styles.container}>
      <Header text='Time to Fight!'/>
      <View style={{alignItems: 'center'}}>
        <View style={styles.rowContainer}>
          <View style={styles.rowContainer}>
            <FlatList
              data={atkteam}
              renderItem={renderPokemonAttacker}
              keyExtractor={item => item.name}
              numColumns={3}
            />
          </View>
          <Image
            style= {styles.imageDimensions}
            source=  "https://i.ibb.co/Lgv9B7B/versus.png"
            alt = "versus"
          />
          <FlatList
            data={defteam}
            renderItem={renderPokemonDefender}
            keyExtractor={item => item.name}
            numColumns={3}
          />
        </View>
        <View style={styles.rowContainer}>
          {displayatk ? (
            <PokeInfo data = {JSON.stringify(attacker)} />
          ): null}
          {displaydef ? (
            <PokeInfo data = {JSON.stringify(defender)} />
          ): null}
        </View>
      </View>
    </View>
  );
}

export default BattleScreen;
