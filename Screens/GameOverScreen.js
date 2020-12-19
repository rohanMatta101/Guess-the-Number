import React from 'react';
import { View,Text,StyleSheet, Button,Image } from 'react-native';
import BodyText from '../Components/BodyText';

const gameOver=props=>{
   return (
       <View style={styles.textview}>
           <Text style={{marginLeft:110,marginBottom:10,fontFamily:'open-sans-bold',fontSize:24}}>Game Over!</Text>
           <Image source={require('../assets/success.png')} style={styles.image}/>
           <Text style={{marginLeft:125,marginTop:10}}>Rounds Taken : {props.rounds}</Text>
           <View style={styles.button}>
             <Button  title="NEW GAME" onPress={()=>props.restart()}/>
           </View>
           
       </View>
   )
}
const styles=StyleSheet.create({
    textview:{
        flexDirection:"column",
        marginLeft:7,
        marginVertical:120,
        width:400,
        padding:20,
        shadowColor:"black",
      shadowOffset:{width:0,height:5},
      shadowOpacity:0.4,
      backgroundColor:"white",
      borderWidth:1,
      borderColor:"black",
      borderRadius:10,
    },
    image:{
      width:"80%",
      height:200,
      marginLeft:30,
      borderRadius:20
    },
    button:{
     marginTop:20,
     marginHorizontal:80,
     borderWidth:1,
     width:200,
     borderColor:"blue",
     borderRadius:10
    }
})
export default gameOver;