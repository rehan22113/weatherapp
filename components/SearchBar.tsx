import { View, Text, TextInput, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import debounce from 'lodash.debounce'
// interface searchData{
//   name:String,
//   country:String
// }

const SearchBar = ({searchLoc}) => {
  const [open,setOpen] = useState(false)
  const [searchCity,setSearchCity] = useState([{
    name:"Nothing to",
    country:'show',
    place_id:"",
  }])

  
  const Search = async(text)=>{
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${text}&language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a31c7d80d3msh9f3d28b0ea4a70bp1c9afejsn4fdcb533b79a',
      'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log("search bar",result[0]);
    setSearchCity(result)
    // setOpen(false);
  } catch (error) {
    console.error(error);
  }

  }

  const SelectCity=(item)=>{
    // console.log(item)
    searchLoc(item)
    setOpen(false)
  }
  const debouncedResults = useMemo(() => {
    return debounce(Search, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <>
    <View >
    <FontAwesome onPress={()=>setTimeout(()=>setOpen(!open),200)} name="search" size={34} color="white" />
    </View>
    {open &&
    <View className='bg-black/90 absolute top-2 z-10 py-5 w-full left-5 px-2'>
     <View className='relative z-50 h-72'>

<TextInput onChangeText={debouncedResults} placeholderTextColor={"white"} placeholder='Search your area...' className='border-1 border-white px-2 py-2 text-white bg-[#363434] text-lg rounded-full'/>
<View className='py-2'>
 <Text className='text-white font-bold text-lg border-b border-gray-500 pb-1'>Search Result</Text>
  
 
{/* {searchCity ? searchCity.map((item)=>{
  return (
    <Pressable onPress={Search}>

 <Text className='text-slate-200 text-lg'>${item.name}, ${item.country}</Text>
 </Pressable>
    )
}):(
  <Text className='text-white'>Nothing to show</Text>
)
} */}
</View>


<FlatList 
 data={searchCity}
 keyExtractor={(item)=>item.place_id}
 renderItem={({item})=>(
   <View className='py-2'>
    <Text className='text-white text-lg' onPress={()=>SelectCity(item)}>{item.name},{item.country}</Text>
  </View>
 )}
 />
</View>
<View className='absolute -bottom-2 left-32'>
 <AntDesign name="closecircle" size={24} color="white" onPress={()=>setOpen(false)} />
</View>
     
    </View>
    }
    </>
  )
}

export default SearchBar