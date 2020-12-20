import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Button,Image,Dimensions, ScrollView,Platform } from 'react-native';
import BodyText from '../Components/BodyText';
//import { Platform } from 'react-native';

const gameOver=props=>{
  const [height,setHeight]=useState(Dimensions.get('window').height);
  const [width,setWidth]=useState(Dimensions.get('window').width);
  useEffect(()=>{
    const updateLayout=()=>{
      setHeight(Dimensions.get('window').height);
      setWidth(Dimensions.get('window').width);
    }
    Dimensions.addEventListener('change',updateLayout);
    return ()=>{
      Dimensions.removeEventListener('change',updateLayout);
    }
  })
  if(height <= 414)
  {
     return (
       <ScrollView>
      <View style={styles.textviewLandscape}>
      <Text style={{marginLeft:110,marginBottom:10,fontFamily:'open-sans-bold',fontSize:24}}>Game Over!</Text>
      <Image source={require('../assets/success.png')} style={styles.imageLandscape}/>
      <Text style={{marginLeft:125,marginTop:10}}>Rounds Taken : {props.rounds}</Text>
      <View style={styles.buttonLandscape}>
        <Button  title="NEW GAME" onPress={()=>props.restart()}/>
      </View>
      
      </View>
      </ScrollView>
     )
  }
  else{
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
    textviewLandscape:{
      shadowColor:"black",
      shadowOffset:{width:0,height:5},
      shadowOpacity:0.4,
      backgroundColor:"white",
      borderWidth:1,
      borderColor:"black",
      borderRadius:10,
      width:400,
      marginLeft:Platform.OS === 'android' ? 180 : 260,
      marginTop:20
    },
    image:{
      width:"80%",
      height:200,
      marginLeft:30,
      borderRadius:20
    },
    imageLandscape:{
      width:"82%",
      height:250,
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
    },
    buttonLandscape:{
      marginTop:10,
     marginHorizontal:90,
     marginBottom:10,
     borderWidth:1,
     width:200,
     borderColor:"blue",
     borderRadius:10
    }

})
export default gameOver;