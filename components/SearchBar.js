import { View ,Text, TextInput, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons"
import { useState } from "react";

const SearchBar = (props) => {

   const [cityName, setCityName] = useState("")   

   function getCityName(city){
      console.log(city)
      setCityName(city)
   }
    console.log("City name  is ",cityName)
   
    function getNameEnter(){
      //  send cityName via props to Waether.js
      props.cityName(cityName)
   }
    return ( 
        <View style={styles.inputWrapper}>
             <TextInput 
                      placeholder="Enter Your City" 
                      style={styles.input}
                      onChangeText={getCityName}
            />
            <Feather style={styles.icon} 
                      name="search" 
                      size={24} 
                      color="orangered" 
                      onPress={getNameEnter}
            />
        </View>
     );
}
 
export default SearchBar;

const styles = StyleSheet.create({
      inputWrapper:{
         justifyContent:"center",
         alignItems:"center",
      //    borderWidth:3,
      //    borderColor:"blue",
      //    borderRadius:50,
      //    height:40,
      },
      input:{
         height:40,
         width:300,
         backgroundColor:"#fefefe",
         paddingHorizontal:20,
         borderRadius:50,
         fontSize:18,
         color:"#000",
         marginVertical:10,
         shadowColor:"#000",
         shadowOffset:{
               width:0,
               height:10
         },
         shadowOpacity:0.3,
         shadowRadius:20,
         elevation:5
      },
      icon:{
            position:"absolute",
            right:10,
            // borderWidth:1,
            // borderColor:"red",
      }
 });
//  npm install --global eas-cli && \
// eas init --id bb1d7499-8b07-4648-bdff-15e39486c501