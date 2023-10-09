import { View ,Text, StyleSheet,Dimensions,ActivityIndicator} from "react-native";
import { useEffect,useState } from "react";
import {FontAwesome} from "@expo/vector-icons"
import {Feather} from "@expo/vector-icons"
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { clear_day, clear_night, cloud_day, cloud_night, haze_day, haze_night, rain_day, rain_night, snow_day, snow_night } from "../assets/backgrounds/index";
const API_KEY = "Your API Key"



const Weather = (props) => {
    
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [icon, setIcon] = useState('')
    const [background, setBackground] = useState(0)
    async function getWeather(city){
        setLoading(true)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        let res = await fetch(url)
        if (res.status == 200){
            res = await res.json()
            setWeatherData(res)
        }else {
            setWeatherData(null)
        }
        setLoading(false)
    } 
    // write function to converrt kelvin to celcius
    function convertToCelcius(kelvin){
        return Math.floor(kelvin - 273.15)
    }
    useEffect(() => {
        console.log("Weather js ",props.cityName)
        getWeather(props.cityName)

        const iconObj = {
            snow: <FontAwesome name="snowflake-o" size={48} color="orangered" />,
            clear: <Ionicons name="sunny" size={48} color="orangered" />,
            rain: <Ionicons name="rainy" size={48} color="orangered" />,
            haze: <Fontisto name="day-haze" size={48} color="orangered" />,
            cloud: <Ionicons name="cloudy" size={48} color="orangered" />
        }

        if (weatherData){
            
            const now = new Date();
            const sunrise=new Date(weatherData.sys.sunrise*1000);
            const sunset = new Date(weatherData.sys.sunset*1000);
            const isDayTime =now>sunrise && now<sunset 
            // const isNightTime =now>sunrise && now>sunset ? true : false;
        

            switch (weatherData.weather[0].main) {
                case "Snow":
                    console.log("Snow")
                    setIcon(iconObj.snow)
                    isDayTime ? setBackground(snow_day) : setBackground(snow_night)
                    break;
                case "Clear":
                    console.log("Clear")
                    setIcon(iconObj.clear)
                    isDayTime ? setBackground(clear_day) : setBackground(clear_night)
                    break;
                case "Rain":
                    console.log("Rain")
                    setIcon(iconObj.rain)
                    isDayTime ? setBackground(rain_day) : setBackground(rain_night)
                    break;
                case "Haze":
                    console.log("Haze")
                    setIcon(iconObj.haze)
                    isDayTime ? setBackground(haze_day) : setBackground(haze_night)  
                    break;
                case "Clouds":
                    console.log("Clouds")
                    setIcon(iconObj.cloud)
                    isDayTime ? setBackground(snow_day) : setBackground(snow_night)
                    break;
                default:
                    setIcon(iconObj.cloud)
                    break;
                
            }
            props.background(background)
        }else { 
            console.log("No Data")        
        }
    
    }, [props.cityName])
    
    if (loading){
        return(
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="red"/>
            </View>
        )
    }else if (weatherData == null){
        return(
            <View >
                <Text style={{fontSize:30,margin:10,
                    // borderColor:"green",borderWidth:2
                    }}>No Data Found</Text>
            </View>
        )
    }else {
        return ( 
            <View>
                <Text style={styles.deg}> {convertToCelcius(weatherData.main.temp)}°C </Text>
                <Text style={styles.cityName}>{weatherData.name}</Text>
                
                <LinearGradient colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.5)']}
                                style={styles.icon}>
                    <View>
                        <Text style={styles.txt} >Humidity {weatherData.main.humidity}</Text>
                        <Text style={styles.txt} >Wind Speed {weatherData.wind.speed}</Text>
                    </View>
                    <View>
                        <Text>{icon}</Text>
                    </View>
                </LinearGradient>
            </View>
         );
    }
}
 
export default Weather;

const styles = StyleSheet.create({
    deg:{
        fontSize:50,
        fontWeight:"bold",
        marginTop:'10%',
        color:"black",
        textAlign:"center",
    },
    cityName:{
        fontSize:30,
        textAlign:"center",
        fontWeight:"bold",
        color:"black",
    },
    icon:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:50,
        padding:20,
        borderRadius:10,
        marginHorizontal:20,
        width:Dimensions.get("screen").width/1.2,
        opacity: 0.3
    },
    loader:{
        // flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    txt:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    }
});
