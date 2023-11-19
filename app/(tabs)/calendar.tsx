import { View, Text } from 'react-native'
import React from 'react'
import ExamSchedule from '../../components/ExamSchedule'
import exams from '../../constants/exams';

const examData = [
  { time: '09:00', title: 'Math Exam', description: 'Chapter 1-3', },
  { time: '11:00', title: 'History Exam', description: 'Ancient Civilizations', },
  // Add more exam data as needed
];

const calendar = () => {
  return (
    <View className='h-full'>
      <ExamSchedule examData={exams}/>
    </View>
  )
}

export default calendar