import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSession} from './../../ctx'
import useUserStore from '../../store/UserStore';

const AddExam = () => {
  const [examName, setExamName] = useState('');
  const [examCode, setExamCode] = useState('');
  const [examDate, setExamDate] = useState(new Date());
  const [examTime, setExamTime] = useState(new Date());
  const [examDuration, setExamDuration] = useState('');
  const [course, setCourse] = useState('');
  const [alert, setAlert] = useState({
    isVisible: false,
    msg:''
})

  const {session} = useSession()
  const {user}:any = useUserStore()

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

  const handleSubmit = async() => {
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
      const res = await fetch('http://10.0.2.2:8000/api/exam/',{
        method: 'POST',
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
      console.log('Returned Data:', res);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      { alert.isVisible && <Text>{alert.msg}</Text>}
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

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

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

export default AddExam;
