import React,{ useState } from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import BodyText from '../Components/BodyText';
//import { useState } from 'react';

const StartScreen=props=>{
    const [enteredValue,setEnteredValue]=useState('');
    const [selectedNumber,setSelectedNumber]=useState();//using this to keep the value stored for the number selected
    const [confirmed,setConfirmed]=useState(false);//using for confriming the user input
    const numInputHandler=TextInput=>{
        setEnteredValue(TextInput.replace(/[^0-9]/g,''))//this is a type of expression which will not take the value if it is non-numeric i.e willd rop that value
    }
    const resetInputHandler=()=>{
        setEnteredValue(' ');//this is the case when user would like to reste the value
        setConfirmed(false);
    }
    const confirmInputHandler=()=>{
        const chosenNum=parseInt(enteredValue);
        if(isNaN(chosenNum) || chosenNum > 99 || chosenNum<=0)
        {
            Alert.alert('Invalid number','Number has to be between 1 and 99',[{text:'Okay'}]);
            return;
        }
        setSelectedNumber(chosenNum);
        Keyboard.dismiss();
        setEnteredValue('')
        setConfirmed(true);
    }
    let confirmedval;
    if(confirmed)
    {
        confirmedval=<View style={styles.numSelected}><Text style={{fontSize:20}}>Selected Number : {selectedNumber}</Text><Button title="Start Game" onPress={ ()=> props.onStartGame(selectedNumber) }/></View>
    }
    return(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()} >
        <View style={styles.screen}>
            <Text style={styles.title}>Start the Game</Text>
            <View style={styles.InputContainer}>
                <BodyText>Select A Number</BodyText>
                <TextInput 
                style={styles.TextInput} 
                keyboardType='number-pad' 
                autoCorrect={false} 
                maxLength={2}
                onChangeText={numInputHandler}
                value={enteredValue}  
                />
                <View style={styles.Buttons}>
                <Button title="Reset" onPress={resetInputHandler}/>
                <Button title="Confirm" onPress={confirmInputHandler}/>
               </View>
            </View>
            {confirmedval}
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
    screen:{
     flex:1,
     alignItems:"center",
     padding:10,
    },
    title:{
     fontSize:17,
     fontFamily:'open-sans-bold',
     justifyContent:"center",
    },
    InputContainer:{
      marginTop:20,
      width:300,
      alignItems:"center",
      shadowColor:"black",
      shadowOffset:{width:0,height:5},
      shadowOpacity:0.4,
      backgroundColor:"white",
      borderWidth:1,
      borderColor:"black",
      borderRadius:10
    },
    Buttons:{
        width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      paddingHorizontal:30
    },
    TextInput:{
        marginTop:10,
        width:40,
        borderBottomColor:"grey",
        borderBottomWidth:1.5,
        textAlign:"center"
    },
    numSelected:{
        marginTop:50,
        shadowColor:"black",
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.4,
        backgroundColor:"white",
        borderWidth:1,
        borderColor:"black",
        borderRadius:10,
       padding:30
    }

})
export default StartScreen;