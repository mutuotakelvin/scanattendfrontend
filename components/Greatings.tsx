import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import useUserStores from '../store/UserStore';


const Greatings = () => {
  const {user}:any = useUserStores()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  return (
    <View className='m-2 rounded-lg bg-gray-400 p-4 flex flex-row justify-between items-center'>
      <View className='w-[70%]'>
        <Text className='text-2xl font-bold'>Hi, {userData.username}</Text>
        <Text>Stay organized and on top of your exams
          with just a click. Best of luck!</Text>
      </View>
      <View className='rounded-full h-16 w-16 bg-slate-600 flex justify-center items-center'>
      <Ionicons name="notifications-sharp" size={50} color="black" />
      </View>
    </View>
  )
}

export default Greatings