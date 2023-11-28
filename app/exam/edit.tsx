import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React,{useState} from 'react'

import EditExam from '../../components/EditExam'
import useExamStore from '../../store/ExamStore'
import DateTimePicker from '@react-native-community/datetimepicker';
import useUserStore from '../../store/UserStore';
import { useRouter } from 'expo-router';


const edit = () => {
    const {selectedExam}: any = useExamStore()
    const [examName, setExamName] = useState(selectedExam.name);
    const [examCode, setExamCode] = useState(selectedExam.code);
    const [examDate, setExamDate] = useState(new Date(selectedExam.date));
    const [examTime, setExamTime] = useState(new Date());
    const [examDuration, setExamDuration] = useState(selectedExam.duration);
    const [course, setCourse] = useState(selectedExam.course);
    const [alert, setAlert] = useState({
    isVisible: false,
    msg:''
    })
    const {user}:any = useUserStore()
    const router = useRouter()

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  const handleDateChange = (event:any, selectedDate:any) => {
    setShowDatePicker(Platform.OS === 'ios'); // On iOS, the DateTimePicker is not dismissed automatically
    setExamDate(selectedDate || examDate);
  };

  const handleTimeChange = (event:any, selectedTime:any) => {
    setShowTimePicker(Platform.OS === 'ios');
    setExamTime(selectedTime || examTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleExamUpdate = async() => {
    const d = examDate.toISOString().slice(0,10)
    const t = examTime.toISOString().slice(11,19)
   
    const formData = {
      exam_name: examName,
      exam_code: examCode,
      exam_date: d,
      exam_time: t,
      exam_duration: 4,
      exam_status: false,
      exam_creator: userData.id,
      department: userData.department,
      school: userData.school,
      course: course,
    };
    console.log('Form Data:', formData);
    try{
      const res = await fetch(`http://10.0.2.2:8000/api/exam/${selectedExam.id}/`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const response = await res.json()
      setAlert({
        isVisible: true,
        msg: 'Exam Added Successfully'
      })
      router.push('/(tabs)/')
      console.log('Returned Data:', res);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      { alert.isVisible && <Text className='text-green-500'>{alert.msg}</Text>}
      <Text>Exam Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setExamName(text)}
        value={examName}
      />

      <Text>Exam Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setExamCode(text)}
        value={examCode}
      />
      <Text>Course</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCourse(text)}
        value={course}
      />
      <Text>Exam Date</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>{examDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={examDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text>Exam Time</Text>
      <TouchableOpacity onPress={showTimepicker}>
        <Text>{examTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={examTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text>Exam Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setExamDuration(text)}
        value={examDuration}
      />

      <Button title="Submit" onPress={handleExamUpdate} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    input: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fff',
      height: 40,
    },
  });

export default edit