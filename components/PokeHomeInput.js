import React, { useState, useEffect } from 'react';
import styles from '../styles';
import Pokedex from 'pokedex-promise-v2';
import { Button, Text, View, TextInput, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/UsefulComponents';


const PokeHomeInput = (props) => {
  const [atkname,setAtkName] = useState("");
  const [defname,setDefName] = useState("");
  const [atkdata,setAtkData] = useState("");
  const [defdata,setDefData] = useState("");
  const [atkteam, setAtkTeam] = useState([]);
  const [defteam, setDefTeam] = useState([]);
  const [storedteams, setStoredTeams] = useState({});
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  let P = new Pokedex();

  useEffect(() => {getData()},[]);

  const getData = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('@prev_team')
      let data = null
      if (jsonValue!=null) {
        data = JSON.parse(jsonValue)
        console.log('Data to be set: ' + JSON.stringify(data));
        setStoredTeams(data)
      } else {
        console.log('just read a null value from Storage')
        setStoredTeams({})
      }
    } catch(e) {
      console.log('Error on data lookup');
      console.dir(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@prev_team', jsonValue)
      console.log('just stored '+jsonValue)
    } catch (e) {
      console.log("error in storeData ")
      console.dir(e)
    }
  }

  async function lookupData(name, side){
    let pokesuccess

    await P.getPokemonByName(name).then(function(response){
      if(response != undefined) {
        let cleaned_data = cleanupData(response)
        console.log(cleaned_data)
        if(side == 'atk'){
          setAtkTeam(atkteam.concat(cleaned_data));
        } else if(side == 'def'){
          setDefTeam(defteam.concat(cleaned_data));
        }
        pokesuccess = true
        console.log('Pokemon lookup Success!');
      } else {
        pokesuccess = false
        console.log('Pokemon lookup Undefined');
      }
    }).catch(function(error) {
      pokesuccess = false
      console.log('Pokemon lookup Error');
    });

    if(pokesuccess){
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  const submitTeams = () => {
    const data = {};
    Object.assign(data, {
      atkteam: atkteam,
      defteam: defteam
    });
    storeData(data)
    props.parentCallback(data);
  }

  function cleanupData(data){
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


    Object.assign(final, {
      name: data.name,
      stats: parseStats(data.stats),
      type: parseType(data.types),
      sprite: data.sprites.front_default,
    });

    return final
  }

  async function addPokemon(side) {
    setIsLoading(true);
    if(side == 'atk'){
      await lookupData(atkname.toLowerCase(), side);
      setAtkName("");
    } else if(side == 'def'){
      await lookupData(defname.toLowerCase(), side);
      setDefName("");
    }
    setIsLoading(false);
  }

  const renderPokemon = ({item}) => {
    return (
      <View style={{border:'thin solid red'}}>
        <Text>{item.name}</Text>
        <Image
          style= {styles.pokemonImage}
          source= {item.sprite}
          alt = {item.name}
        />

      </View>
    )
  }

  return(
    <View style={styles.container}>
      {!isLoading ? (
        <View style={styles.inputRow}>
          <View>
            <TextInput
              style = {styles.textBox}
              placeholder = "Enter New Attacking Pokemon's Name"
              onChangeText = {text => {setAtkName(text)}}
            />
            <Button
              title="Add"
              onPress={() => {
                if(atkteam.length <= 5){
                  addPokemon('atk')
                } else {
                  console.log("Team limit reached")
                }
              }}
            />
            <Button
              title="Use Most Recent Team"
              onPress={() => {
                if(JSON.stringify(storedteams) == '{}'){
                  console.log("No previous team to pull from")
                } else {
                  setAtkTeam(storedteams.atkteam)
                }
              }}
            />
            <Button
              title="Clear Team"
              onPress={() => {
                setAtkTeam([])
              }}
            />
            <Text style={styles.paragraphTextSmall}> Attacking Team: {atkteam.length}/6 </Text>
            <FlatList
              data={atkteam}
              renderItem={renderPokemon}
              keyExtractor={item => item.name}
            />
          </View>

          <View>
            <TextInput
              style = {styles.textBox}
              placeholder = "Enter New Defending Pokemon's Name"
              onChangeText = {text => {setDefName(text)}}
            />
            <Button
              title="Add"
              onPress={() => {
                if(defteam.length <= 5){
                  addPokemon('def')
                } else {
                  console.log("Team limit reached")
                }
              }}
            />
            <Button
              title="Use Most Recent Team"
              onPress={() => {
                if(JSON.stringify(storedteams) == '{}'){
                  console.log("No previous team to pull from")
                } else {
                  setDefTeam(storedteams.defteam)
                }
              }}
            />
            <Button
              title="Clear Team"
              onPress={() => {
                setDefTeam([])
              }}
            />
            <Text style={styles.paragraphTextSmall}> Defending Team {defteam.length}/6 </Text>
            <FlatList
              data={defteam}
              renderItem={renderPokemon}
              keyExtractor={item => item.name}
            />
          </View>
        </View>
      ): <Loading />}
      {showError ? (
        <Text style={styles.errorText}> There has been an error. Make sure you either spelled everything correctly or filled everything out!</Text>
      ): null}
      <Button
        title="Submit"
        onPress={() => {
          if(defteam.length < 1 || atkteam.length < 1){
            console.log("A Team has no Pokemon")
          } else {
            submitTeams()
          }
        }}
      />
    </View>
  )
}

export default PokeHomeInput;
