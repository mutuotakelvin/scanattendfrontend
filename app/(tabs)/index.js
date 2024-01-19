import {StyleSheet, View, Text, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import Greatings from '../../components/Greatings'
import ExamList from '../../components/ExamList'
import MyList from '../../components/ExamList'
import useAccountStore from '../../store/AccountStore'
import useExamStore from '../../store/ExamStore'



const index = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const {setExams} = useExamStore()

  const {account} = useAccountStore()

  const handleRefresh = () => {
    console.log('refreshing')
    fetchData()
    setRefresh(!refresh)
  }

  useEffect(() => {
    fetchData()
  }, [refresh])

  const fetchData = async () => {
    try{
      const res = await fetch('http://10.0.2.2:8000/api/exam/')
      const data = await res.json()

      setData(data.results)
      setExams(data.results)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className='h-full'>
      <View className='mt-6 my-2 h-[20%]'>
        <Greatings />
        <View className='flex flex-row justify-between items-center m-1 p-2 mb-6'>
          <Text className='text-xl font-medium'>
            Upcoming exams
          </Text>
          {
            account == 'Lecturer' && (
              <Pressable className='bg-[#A1AAFF] p-1 m-1 border border-white rounded-lg' onPress={() => router.push('/(modals)/addExam')}>
                <Text className='text-white'>Create exam</Text>
              </Pressable>
            )
          }
        </View>
      </View>
      <View className='m-1 h-[70%] mt-8 mb-4'>
        <ExamList data={data} onRrefresh={handleRefresh}/>
      </View>
    </View>
  )
}

export default index