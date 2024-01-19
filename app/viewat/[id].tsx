import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useExamStore from '../../store/ExamStore'
// import DataTable from 'react-data-table-component';

const columns = [
  {
      name: 'Title',
      selector: (row:any) => row.title,
  },
  {
      name: 'Year',
      selector: (row:any) => row.year,
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]

const examAttendance = () => {
    const {id} = useLocalSearchParams()
    const {exams}:any = useExamStore()
    const exam :any = exams.find((exam:any) => exam.id == id)
  return (
    <View>
        <Text>Exam Attendance for {id}</Text>
        <Text>Exam name{exam?.exam_name}</Text>
        {/* <DataTable
            columns={columns}
            data={data}
        /> */}
    </View>
  )
}

export default examAttendance