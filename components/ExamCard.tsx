import { View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import { Fontisto, Ionicons,FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import useAccountStore from '../store/AccountStore'
import useExamStore from '../store/ExamStore'


const ExamCard = ({id,name,date,time,duration,code,qrcode, lec, onRefresh}:any) => {
  const router = useRouter()
  const {account}: any = useAccountStore()
  const {setSelectedExam, selectedExam}: any = useExamStore()

  const handleEditExam = () => {
    const examToEdit = {
      id,
      name,
      date,
      time,
      duration,
      code,
      qrcode,
      lec
    }
    setSelectedExam(examToEdit)
    router.push('/exam/edit') 
    
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Exam",
      "Are you sure you want to delete this exam?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const response = await fetch(`http://10.0.2.2:8000/api/exam/${id}/`, {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  // Include any additional headers if needed
                },
              });
  
              // Check if the response status is in the success range (2xx)
              if (response.ok) {
                console.log('Exam deleted successfully');
                onRefresh()
                router.push('/(tabs)/');
              } else {
                // Handle non-success response
                console.error('Failed to delete exam:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Error deleting exam:', error);
            }
          },
        },
      ]
    );
  };
  

  return (
    <View className='m-2 p-2 rounded-lg bg-[#4E5CFF]'>
      <Text className='text-lg font-medium tracking-wider py-2 text-white'>{name}</Text>
          <View className='flex-1 flex-row gap-4 items-center mb-2'>
            <FontAwesome5 name="user" size={20} color="white" />
            <Text className='text-white'>{lec}</Text>
          </View>
      <View className='my-1' >
        <View className='flex flex-row justify-start items-center space-x-5'>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Fontisto name="date" size={20} color="white" />
            <Text className='text-white'>{date}</Text>
          </View>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Ionicons name="time-outline" size={20} color="white" />
            <Text className='text-white'>{time}</Text>
          </View>
          <View className='flex-1 flex-row gap-4 items-center'>
            <Ionicons name="ios-timer-outline" size={20} color="white" />
            <Text className='text-white'>{duration} hours</Text>
          </View>
        </View>
        <View className='mt-3 flex flex-row justify-center items-center space-x-5'>
        {
            account == 'Student' && (
              <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-8 flex flex-1 justify-center items-center' onPress={() => router.push(`/attend/${id}`)}>
            <Text className='p-1 text-white'>Attend</Text>
          </Pressable>
              
            )
          }
          <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-8 flex flex-1 justify-center items-center' onPress={() => router.push(`/exam/${id}`)}>
            <Text className='p-1 text-white'>View</Text>
          </Pressable>
          {
            account == 'Lecturer' && (
              <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-8 flex flex-1 justify-center items-center' onPress={handleEditExam}>
                <Text className='p-1 text-white'>Edit</Text>
              </Pressable>
            )
          }
          {
            account == 'Lecturer' && (
              <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-8 flex flex-1 justify-center items-center' onPress={handleDelete}>
                <Text className='p-1 text-white'>Delete</Text>
              </Pressable>
              
            )
          }
        </View>
      </View>
    </View>
  )
}

export default ExamCard