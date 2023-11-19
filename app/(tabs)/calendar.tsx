import { View, Text } from 'react-native'
import React from 'react'
import ExamSchedule from '../../components/ExamSchedule'
import exams from '../../constants/exams';


const calendar = () => {
  return (
    <View className='h-full'>
      <ExamSchedule examData={exams}/>
    </View>
  )
}

export default calendar