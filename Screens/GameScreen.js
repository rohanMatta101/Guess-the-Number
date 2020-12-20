import React,{ useState,useRef,useEffect } from 'react';
import { View,Text,StyleSheet, Button,Alert,ScrollView,Dimensions,Platform } from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';


const randomGenerator=(min,max,exclude)=>{
  min=Math.ceil(min);
  max=Math.floor(max);
  const rndNum=Math.floor(Math.random() * (max-min)) + min;//generating the random number
  if(rndNum === exclude)
  {
     return randomGenerator(min,max,exclude);
  }
  else{
     return rndNum;
  }
  
}
const gameScreen=props=>{
    const firstGuess=randomGenerator(1,100,props.userChoice);
   const [ currentGuess,setCurrentGuess ] = useState(firstGuess);
   const [pastGuesses,setPastGuesses] = useState([firstGuess]);//trying to list all thr guesses while random guesses are being generated
   const [width,setWidth]=useState(Dimensions.get('window').width);
   const [height,setHeight]=useState(Dimensions.get('window').height);
   const [Rounds,setRounds]=useState(0);
   //console.log(pastGuesses);
   const currentLow=useRef(1); //these are variables which retain their values even after re rendering takes place
   const currentHigh=useRef(100);
   
   useEffect(()=>{ //useEffect is a type of React hook which fires up only when component has been rendered
       if(currentGuess === props.userChoice)
       {
            
          props.onGameOver(Rounds);
       }
   })
   useEffect(()=>{
    const diffLayout=()=>{
        setHeight(Dimensions.get('window').height);
        setWidth(Dimensions.get('window').width);
        //console.log(width);
        //console.log(height);
    }
    Dimensions.addEventListener('change',diffLayout);//for listening to events like Orientation changes we use this
    return()=>{
        Dimensions.removeEventListener('change',diffLayout);
    }
   })
   
   const nextGameHandler=direction=>{
       if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice))
       {
           Alert.alert('Don\'t lie','You know this is wrong',[{text:"Sorry!"}]);
           return;
       }
       if(direction === 'lower')
       {
           currentHigh.current = currentGuess; //agar jo computer ne guess kiya number hyum usse hint de rhe hai ki isse lower jo iska matlab max ki limit becomes vo value jo compiter ne guess kari
       }
       else if(direction === 'higher')
       {
        currentLow.current = currentGuess + 1;
       }
       const newNum=randomGenerator(currentLow.current,currentHigh.current,currentGuess);
       setCurrentGuess(newNum);
       //let currRound=Rounds;
       setRounds(currRound=>currRound+1);
       setPastGuesses(currPastGuess=>[newNum,...currPastGuess]);//currPastGuess gives the current array
   }
   if( height <= 414  )
   {
      return (
          <ScrollView>
        <View style={styles.screenLandscape}>
        <Text style={{fontFamily:'open-sans-bold',fontSize:20}}>Computer's Guess : {currentGuess} </Text>
        <View style={styles.buttons}>
            <AntDesign name='minuscircle' color="red" style={{marginRight:30}} size={32} onPress={nextGameHandler.bind(this,'lower')}/>
            <AntDesign name='pluscircle' color="red" size={32} onPress={()=>nextGameHandler('higher')} />
        </View>
        <ScrollView>
            {pastGuesses.map(Guess=>(
                <View key={Guess} style={{borderWidth:1,borderColor:"black",marginTop:25,padding:10,borderRadius:25}}>
                   <Text style={{color:"black"}}>Last Guess:{Guess}</Text>
                </View>
            ))}
        </ScrollView>
       </View>
       </ScrollView>
      )
   }
   else{
   return(
       <View style={styles.screen}>
           <Text style={{fontFamily:'open-sans-bold',fontSize:20}}>Computer's Guess : {currentGuess} </Text>
           <View style={styles.buttons}>
               <AntDesign name='minuscircle' color="red" style={{marginRight:30}} size={32} onPress={nextGameHandler.bind(this,'lower')}/>
               <AntDesign name='pluscircle' color="red" size={32} onPress={()=>nextGameHandler('higher')} />
           </View>
           <ScrollView>
               {pastGuesses.map(Guess=>(
                   <View key={Guess} style={{borderWidth:1,borderColor:"black",marginTop:25,padding:10,borderRadius:25}}>
                      <Text style={{color:"black"}}>Last Guess:{Guess}</Text>
                   </View>
               ))}
           </ScrollView>
       </View>
   )
    }
}
const styles=StyleSheet.create({
     buttons:{
         marginTop:20,
         flexDirection:"row",
         justifyContent:"space-between"
     },
     screen:{
        marginTop:20,
        marginLeft:55,
        width:300,
        alignItems:"center",
        shadowColor:"black",
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.4,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        padding:25
        
     },
     screenLandscape:{
        alignItems:"center",
        width:400,
        marginLeft:Platform.OS === 'android' ? 180 : 250,
        marginTop:25,
        shadowColor:"black",
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.4,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
        padding:20,


     }
})
export default gameScreen;
/*<Button title="LOWER"   onPress={nextGameHandler.bind(this,'lower')}/>
               <Button title="GREATER"  onPress={()=>nextGameHandler('higher')}/>*/
               /*
               
               */ 