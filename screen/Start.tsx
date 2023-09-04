import { View, Text, ImageBackground, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'

const Start = ({navigation}) => {
  return (
    <ImageBackground blurRadius={75} source={require('../assets/bg.png')}  className='flex-1'>
      <LinearGradient
        colors={['#000000','rgba(0, 0, 0, 0.34)','#000000']} className='h-full'>
    <StatusBar style='light' />
      
    <SafeAreaView>
        <View className='flex h-full justify-around items-center'>
          <View>
          <Image source={require('../assets/main/partly_sunny.png')} className=' object-contain w-[370px] h-[260px]' />
        <View className='px-12 py-5'>

          <Text className='text-white font-extrabold text-[27px] text-center'>Discover the Weather in Your City</Text>
          <Text className='text-white text-center '>Get to know your weather map and radar precipitation forecast</Text>
        </View>
        </View>
        <View>
          <Pressable onPress={()=>navigation.navigate('home')}>
          <LinearGradient
        colors={['#0095FF','#0095FF','#0095FF','#0355a1']} className='px-20 py-3 rounded-lg'>
            <Text className='text-center text-white font-bold text-xl'>Get Started</Text>
            </LinearGradient>
          </Pressable>
        </View>
        </View>
    </SafeAreaView>
      
    
    </LinearGradient>
    </ImageBackground>
  )
}

export default Start