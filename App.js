import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
// import * as backgrounds from '/assets/backgrounds/index';


export default function App() {

  const [savedCityName, setSavedCityName] = useState("")
  const [backgroundImg, setBackgroundImg] = useState("")

  function getCityName(city){
    // console.log("App js ",city)
    setSavedCityName(city)
    console.log("App js saved city name is  ",savedCityName)
  }
  function backgroundHandler(background){
    setBackgroundImg(background)
    // setBackgroundImg(backgrounds[background])
    console.log("App js background is ",background)
  }
  return (
    <View style={styles.container}>
     
      <ImageBackground resizeMode='cover' style={styles.container} source={backgroundImg}  >
        
        <SearchBar cityName={getCityName}/>
                {/* // send cityName via props to Waether.js */}
        <Weather cityName={savedCityName} background={backgroundHandler}/>
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
  },
});
