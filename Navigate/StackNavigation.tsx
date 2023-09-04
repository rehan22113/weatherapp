import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import Start from '../screen/Start';


const Stack = createNativeStackNavigator();

const StackNavigation = () => { 
  return (
    <Stack.Navigator >
      <Stack.Screen component={Start} name='start' options={{ headerShown: false,
      headerLeft:()=>{
          return (
            <View>
              <Text>Left</Text>
            </View>
          )
      },
      headerRight:()=>{
        return (
          <View>
            <Text>Right</Text>
          </View>
        )
    },
      headerTintColor: 'black', 
      headerTitleAlign:'center',
      headerTitle:'Home'
      }} />
      <Stack.Screen component={Home} name='home' options={{ headerShown: false,
      headerLeft:()=>{
          return (
            <View>
              <Text>Left</Text>
            </View>
          )
      },
      headerRight:()=>{
        return (
          <View>
            <Text>Right</Text>
          </View>
        )
    },
      headerTintColor: 'black', 
      headerTitleAlign:'center',
      headerTitle:''
      }} />
    </Stack.Navigator>
  )
}

export default StackNavigation