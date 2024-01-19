import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
// import exams from '../constants/exams'
import useExamStore from '../store/ExamStore';

const ExamSchedule = () => {
  const {exams}:any = useExamStore()
  const [examData, setExamData] = useState(exams)

  const fetchData = async () => {
    try{
      const res = await fetch('http://10.0.2.2:8000/api/exam/')
      const data = await res.json()

      setExamData(data.results)
      console.log('Exam Data',data.results)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }
  ,[])

  const examDataForTimeline = examData.map((exam:any) => ({
    time: `${exam.exam_date} ${exam.exam_time}`,
    title: exam.exam_name,
    description: `Created by ${exam.exam_creator}`,
  }));



  return (
    <View style={styles.container}>
      <Timeline
        data={examDataForTimeline}
        circleSize={20}
        circleColor="rgb(45,156,219)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#4E5CFF',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{ color: 'gray' }}
        innerCircle={'dot'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
});

export default ExamSchedule;
