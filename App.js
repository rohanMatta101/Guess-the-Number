
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import StartScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOver from './Screens/GameOverScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/Myfonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/Myfonts/OpenSans-Bold.ttf'),
  })
}
export default function App() {
  const [userNumber,setUserNumber] =useState();
  const [gameRounds,setGameRounds] =useState(0);
  const [dataloaded,setDataLoaded]=useState(false);
  if(!dataloaded)
  {
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)}/> //Apploading component is used because it waits till downloads have are ready for use and tells the device to keep tht splash screen on till all downloads are complete
  }
  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber);
    setGameRounds(0);
  }
  const configNewGame=()=>{
    setGameRounds(0);
    setUserNumber(null);
  }
  const gameOverHandler=(numOfRounds)=>{
     setGameRounds(numOfRounds);
  }
  let content=<StartScreen onStartGame={startGameHandler}/>
  if(userNumber && gameRounds <= 0)
  {
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  } 
  else if(gameRounds > 0)
  {
    content=<GameOver rounds={gameRounds} restart={configNewGame}/>
  }
  return (
    <View style={styles.main}>
      <Header title="Guess The Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
      flex:1
    }
});
