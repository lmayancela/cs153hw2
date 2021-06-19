import React, { useState } from 'react';
import styles from '../styles';
import Pokedex from 'pokedex-promise-v2';
import { Button, Text, View, TextInput } from 'react-native';
import { Loading } from '../components/UsefulComponents';


const PokeHomeInput = (props) => {
  const [atkname,setAtkName] = useState("");
  const [defname,setDefName] = useState("");
  const [move,setMove] = useState("");
  const [atkdata,setAtkData] = useState("");
  const [defdata,setDefData] = useState("");
  const [moveData, setMoveData] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const data = {};
  let P = new Pokedex();

  async function lookupData(names, move){
    let pokesuccess, movesuccess

    await P.getPokemonByName(names).then(function(response){
      if(response != undefined) {
        setAtkData(JSON.stringify(response[0]));
        setDefData(JSON.stringify(response[1]));
        Object.assign(data, { pokemon1: response[0]});
        Object.assign(data, { pokemon2: response[1]});
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

    await P.getMoveByName(move).then(function(response) {
      if(response != undefined){
        setMoveData(JSON.stringify(response));
        Object.assign(data, { move: response});
        movesuccess = true
        console.log('Move lookup Success!');
      } else {
        movesuccess = false
        console.log('Move lookup Undefined');
      }
    }).catch(function(error) {
      movesuccess = false
      console.log('Move lookup Error');
    });

    if(pokesuccess && movesuccess){
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  async function verify(){
    if(move == ""){
      setMove('null'); //This line is to help force an error should the user leave move empty
    }
    setIsLoading(true)
    await lookupData([atkname.toLowerCase(),defname.toLowerCase()], move.toLowerCase());
    setMove("");
    setAtkName("");
    setDefName("");
    props.parentCallback(data)
    setIsLoading(false);
  }

  return(
    <View>
      {!isLoading ? (
        <View>
          <TextInput
            style = {styles.textBox}
            placeholder = "Enter Attacking Pokemon's Name"
            onChangeText = {text => {setAtkName(text)}}
          />
          <TextInput
            style = {styles.textBox}
            placeholder = "Enter Defending Pokemon's Name"
            onChangeText = {text => {setDefName(text)}}
          />
          <TextInput
            style={styles.textBox}
            placeholder= "Enter Move"
            onChangeText = {text => {setMove(text)}}
          />
          <Button
            title="Submit"
            onPress={() => {
              verify()
            }}
          />
        </View>
      ): <Loading />}
      {showError ? (
        <Text style={styles.errorText}> There has been an error. Make sure you either spelled everything correctly or filled everything out!</Text>
      ): null}
    </View>
  )
}

export default PokeHomeInput;
