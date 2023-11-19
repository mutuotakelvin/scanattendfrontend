import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Fontisto, Ionicons,FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


const ExamCard = ({id,name,date,time,duration,code,qrcode, lec}:any) => {
  const router = useRouter()

  return (
    <View className='m-2 p-2 rounded-lg bg-gray-400'>
      <Text className='text-lg font-medium tracking-wider py-2'>{name}</Text>
          <View className='flex-1 flex-row gap-4 items-center mb-2'>
            <FontAwesome5 name="user" size={20} color="black" />
            <Text>{lec}</Text>
          </View>
      <View className='my-1' >
        <View className='flex flex-row justify-start items-center space-x-5'>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Fontisto name="date" size={20} color="black" />
            <Text>{date}</Text>
          </View>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text>{time}</Text>
          </View>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Ionicons name="ios-timer-outline" size={20} color="black" />
            <Text>{duration} hours</Text>
          </View>
        </View>
        <View className='mt-3 flex flex-row justify-center items-center space-x-5'>
          <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center' onPress={() => router.push('/exam/attend')}>
            <Text className='p-1 text-white'>Attend</Text>
          </Pressable>
          <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center' onPress={() => router.push(`/exam/${id}`)}>
            <Text className='p-1 text-white'>View</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default ExamCard