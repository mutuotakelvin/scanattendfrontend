import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Fontisto, Ionicons,FontAwesome, Octicons,FontAwesome5 } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import useExamStore from '../../store/ExamStore'

const  page = () => {
  const {id} = useLocalSearchParams()
  const [data, setData] = useState([])
  const router = useRouter()
  let exam_instructions = [
    "No electronic devices, including mobile phones, are allowed during the exam.",
    "Make sure to arrive at least 30 minutes before the scheduled start time.",
    "No books, notes, or papers are allowed during the exam.",
    "Follow the exam proctor's instructions throughout the duration of the exam."
  ]
  const fetchData = async () => {
    try{
      const res = await fetch('http://10.0.2.2:8000/api/exam/')
      const data = await res.json()

      setData(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const {exams}:any = useExamStore()
  const exam :any = data.find((exam:any) => exam.id == id)
  console.log('exams', exam)
  return (
    <ScrollView className='mb-2'>
      <View className='flex flex-row justify-between items-start m-1 mt-6 px-2'>
        <Text className='text-2xl tracking-wider w-[70%]'>{exam?.exam_name}</Text>
        <View className='bg-gray-400 rounded-lg'>
          <Text className='px-4 py-1 '>Not Confirmed</Text>
        </View>
      </View>
      <View className='flex flex-row items-center gap-3 mb-2 mt-4'>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
        <FontAwesome5 name="user" size={20} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.exam_creator}</Text>
        </View>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <Text className='w-17 tracking-tight'>Exam code: {exam?.exam_code}</Text>
        </View>
      </View>
      <View className='flex flex-row justify-start items-center gap-3 mb-6 mt-2'>
        <View className='flex flex-row items-center gap-2'>
          <Fontisto name="date" size={24} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.exam_date}</Text>
        </View>
        <View className='flex flex-row items-center gap-2'>
          <Ionicons name="time-outline" size={24} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.exam_time}</Text>
        </View>
        <View className='flex flex-row items-center gap-2'>
          <Ionicons name="ios-timer-outline" size={24} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.exam_duration} hours</Text>
        </View>
      </View>
      <View className='flex flex-row items-center gap-3 mb-6'>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <Ionicons name="ios-school-sharp" size={24} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.school}</Text>
        </View>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <FontAwesome name="building-o" size={24} color="black" />
          <Text className='w-17 tracking-tight'>{exam?.department}</Text>
        </View>
      </View>
      <View className='py-2 my-2'>
        <Text className='font-bold px-2'>Exam Instructions</Text>
        {exam_instructions.map((instruction,index) => (
          <View className='flex flex-row items-center gap-2 mb-2 px-2 mt-1' key={index}>
            <Octicons name="dot-fill" size={24} color="black" />
            <Text className='w-17 tracking-tight text-sm'>{instruction}</Text>
            </View>
        ))}
      </View>
      <View className='flex flex-row justify-between items-center space-x-4 px-2'>
        <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => console.log('am proud man')}>
          <Text className='p-1 text-white'>Resources</Text>
        </Pressable>
        <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => router.push('/exam/attend')}>
          <Text className='p-1 text-white'>Attend</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default page