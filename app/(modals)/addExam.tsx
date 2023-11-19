import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExam = () => {
  const [examName, setExamName] = useState('');
  const [examCode, setExamCode] = useState('');
  const [examDate, setExamDate] = useState(new Date());
  const [examTime, setExamTime] = useState(new Date());
  const [examDuration, setExamDuration] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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

  const handleSubmit = () => {
    const formData = {
      examName,
      examCode,
      examDate,
      examTime,
      examDuration,
    };

    console.log('Submitted Data:', formData);
    // You can perform further actions, such as sending the data to a server, here.
  };

  return (
    <View style={styles.container}>
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
