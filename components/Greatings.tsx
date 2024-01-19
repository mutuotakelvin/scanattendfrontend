import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import useUserStores from '../store/UserStore';
import useAccountStore from '../store/AccountStore';


const Greatings = () => {
  const {user}:any = useUserStores()
  const {account}:any = useAccountStore()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  return (
    <View className='m-2 mt-6 rounded-lg bg-[#4E5CFF] p-4 flex flex-row justify-between items-center'>
      <View className='w-[70%]'>
        <Text className='text-white text-2xl font-bold'>Hi, {account == 'Lecturer' ? `Lecturer ${userData.username }` : userData.username}</Text>
        <Text className='text-white'>Stay organized and on top of your exams
          with just a click. Best of luck!</Text>
      </View>
      <View className='rounded-full h-16 w-16 bg-white flex justify-center items-center'>
      <Ionicons name="notifications-sharp" size={50} color="#a1aaff" />
      </View>
    </View>
  )
}

export default Greatings