import {StyleSheet, View, Text, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Greatings from '../../components/Greatings'
import ExamList from '../../components/ExamList'
import MyList from '../../components/ExamList'
import useAccountStore from '../../store/AccountStore'



const index = () => {
  const router = useRouter()
  const {account}:any = useAccountStore()
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
        <ExamList />
      </View>
    </View>
  )
}

export default index