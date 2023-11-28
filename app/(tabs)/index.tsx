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
  const {setExams}:any = useExamStore()

  const {account}:any = useAccountStore()

  const handleRefresh = () => {
    console.log('refreshing')
    fetchData()
    setRefresh(prev => !prev)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    <View>
      <View className='mt-6 h-[20%]'>
        <Greatings />
        <View className='flex flex-row justify-between items-center m-1 p-2'>
          <Text className='text-xl font-medium'>
            Upcoming exams
          </Text>
          {
            account == 'Lecturer' && (
              <Pressable onPress={() => router.push('/(modals)/addExam')}>
                <Text>Create exam session</Text>
              </Pressable>
            )
          }
        </View>
      </View>
      <View className='m-1 h-[72%] mt-6 mb-4'>
        <ExamList data={data} onRrefresh={handleRefresh}/>
      </View>
    </View>
  )
}

export default index