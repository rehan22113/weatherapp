import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import useLocalWeatherApi from '../utils/useLocalWeatherApi copy';
import useSearchWeatherApi from '../utils/useSearchWeatherApi';

const image = {
 cloudy : require("../assets/main/cloudy.png"),
 fog : require("../assets/main/fog.png"),
 heavy_rain : require("../assets/main/heavy_rain.png"),
 overcast : require("../assets/main/overcast.png"),
 partly_sunny : require("../assets/main/partly_sunny.png"),
 partly_cloudy : require("../assets/main/partly_sunny.png"),
 rainy : require("../assets/main/rainy.png"),
 snow : require("../assets/main/snow.png"),
 sunny : require("../assets/main/sunny.png"),
 clear : require("../assets/main/clear.png"),
}
const Home = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData,setWeatherData] = useState({
      summary:'',
      degree:'wait...',
      wind:'',
      humidity:'',
      angle:'',
      rain:'',
      icon:'cloudy'
  })
  useEffect(()=>{
    (async()=>{
      if(location){
        const weather= await useSearchWeatherApi(location)
        // console.log(weather.current.icon)
        setWeatherData({
          summary: weather.current.summary,
          degree: weather.current.feels_like,
         wind: weather.current.wind.speed,
         humidity: weather.current.humidity,
         angle:weather.current.wind.angle,
         rain: '10%',
         icon:weather.current.icon
        })
      }
    })()
  },[location])
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      // console.log("locations",loc)
      // setLocation(loc);
      
      const weather= await useLocalWeatherApi(loc);
       setWeatherData({
       summary: weather.current.summary,
       degree: weather.current.feels_like,
       wind: weather.current.wind.speed,
       humidity: weather.current.humidity,
       angle:weather.current.wind.angle,
       rain: '10%',
       icon:weather.current.icon
     })
        
      
      // console.log("weather",weather)
    })();
    
  }, []);
  
  return ( 
    <ImageBackground blurRadius={65} source={require('../assets/bg.png')}  className='flex-1'>
      <LinearGradient
        colors={['#000000','rgba(0, 0, 0, 0.34)','#000000']} className='h-full'>
    <SafeAreaView>
        <View className='flex flex-row items-center justify-between px-5 py-2'> 
            <View className=' rotate-90 bg-gray-600 rounded-3xl p-1'>
            <MaterialIcons name="bar-chart" size={40} color="white" />
            </View>
            {/* search icon */}
            <SearchBar searchLoc={setLocation}/>
        </View>
        <View className='flex container px-5 py-1'>
            <Text className='text-white font-bold text-xl'>Today's Report</Text>
            <View className='flex items-center py-5'>

          <Image source={image[weatherData.icon]} className=' object-contain w-[250px] h-[240px]' />
            </View>
            <View className='gap-10'>

                <Text className='text-center text-white text-2xl font-extrabold'>{weatherData.summary}</Text>
                <View>
                    {/* <View className='flex absolute inset-0 right-14'>

                <Entypo name="circle" size={20} color="lightblue" />
                    </View> */}
                <Text className='text-center text-white text-7xl font-bold'>{weatherData.degree}°</Text>
                </View>
                <View className='flex flex-row justify-around'>
                  <View className='flex flex-col justify-center items-center'>
                    <Image source={require('../assets/wind.png')} className='w-10 h-10' />
                    <View className='flex flex-row'>

                    <Text className='text-white text-center font-bold'>{weatherData.wind}</Text>
                    <View className={`rotate-[${weatherData.angle}]`}>
                    <AntDesign name="arrowdown" size={18} color="white" />
                    </View>
                    </View>
                    <Text className='text-white text-center font-bold'>Wind</Text>
                    </View>
                    <View className='flex flex-col justify-center items-center'>
                    <Image source={require('../assets/humidity.webp')} className='w-10 h-10' />
                    <Text className='text-white text-center font-bold'>{weatherData.humidity}%</Text>
                    <Text className='text-white text-center font-bold'>Humidity</Text>
                    </View>
                    <View className='flex flex-col justify-center items-center'>
                    <Image source={require('../assets/nightrain.webp')} className='w-10 h-10' />
                    <Text className='text-white text-center font-bold'>{weatherData.rain}</Text>
                    <Text className='text-white text-center font-medium text-[10px]'>Chance of rain</Text>
                    </View>
                  
                </View>
            </View>
          
       
        </View>
    </SafeAreaView>
      </LinearGradient>
    <StatusBar style='light' />
    </ImageBackground>
  )
}

export default Home