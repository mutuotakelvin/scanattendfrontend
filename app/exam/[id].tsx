import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Fontisto, Ionicons,FontAwesome, Octicons,FontAwesome5 } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import useExamStore from '../../store/ExamStore'
import useUserStores from '../../store/UserStore';
import useAccountStore from '../../store/AccountStore'

const  page = () => {
  const {id} = useLocalSearchParams()
  const [data, setData] = useState([])
  const router = useRouter()
  const {account}: any = useAccountStore()

  const {user}:any = useUserStores()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
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

  const handleViewAttendance = () => {
    router.push('/attend/view')
  }

  const {exams}:any = useExamStore()
  const exam :any = data.find((exam:any) => exam.id == id)
  console.log('exams', exam)
  return (
    <ScrollView className='mb-2 bg-[#4E5CFF]'>
      <View className='flex flex-row justify-between items-start m-1 mt-6 px-2'>
        <Text className='text-2xl tracking-wider w-[70%] text-white'>{exam?.exam_name}</Text>
        <View className='bg-gray-400 rounded-lg'>
          <Text className='px-4 py-1 '>Not Confirmed</Text>
        </View>
      </View>
      <View className='flex flex-row items-center gap-3 mb-2 mt-4'>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
        <FontAwesome5 name="user" size={20} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.exam_creator}</Text>
        </View>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <Text className='w-17 text-white tracking-tight'>Exam code: {exam?.exam_code}</Text>
        </View>
      </View>
      <View className='flex flex-row justify-start items-center gap-3 mb-6 mt-2'>
        <View className='flex flex-row items-center gap-2'>
          <Fontisto name="date" size={24} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.exam_date}</Text>
        </View>
        <View className='flex flex-row items-center gap-2'>
          <Ionicons name="time-outline" size={24} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.exam_time}</Text>
        </View>
        <View className='flex flex-row items-center gap-2'>
          <Ionicons name="ios-timer-outline" size={24} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.exam_duration} hours</Text>
        </View>
      </View>
      <View className='flex flex-row items-center gap-3 mb-6'>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <Ionicons name="ios-school-sharp" size={24} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.school}</Text>
        </View>
        <View className='flex flex-row items-center gap-2 w-[45%]'>
          <FontAwesome name="building-o" size={24} color="white" />
          <Text className='w-17 tracking-tight text-white'>{exam?.department}</Text>
        </View>
      </View>
      <View className='py-2 my-2'>
        <Text className='font-bold px-2 text-white'>Exam Instructions</Text>
        {exam_instructions.map((instruction,index) => (
          <View className='flex flex-row items-center gap-2 mb-2 px-2 mt-1' key={index}>
            <Octicons name="dot-fill" size={24} color="white" />
            <Text className='w-17 tracking-tight text-sm text-white'>{instruction}</Text>
            </View>
        ))}
      </View>
      <View className='flex flex-row justify-between items-center space-x-4 px-2'>
        <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => console.log('am proud man')}>
          <Text className='p-1 text-base font-semibold text-white'>Resources</Text>
        </Pressable>
        {
          account == 'Student' && (
            <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => router.push(`/attend/${exam?.id}`)}>
              <Text className='p-1 text-base font-semibold text-white'>Attend</Text>
            </Pressable>
          )
        }
        {
          account == 'Lecturer' && (
            <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => router.push(`/attend/view/${exam?.id}`)} >
              <Text className='p-1 text-base font-semibold text-white'>View Attendance</Text>
            </Pressable>
          )
        }
      </View>
    </ScrollView>
  )
}

export default page