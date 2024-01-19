import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useUserStore from '../../../store/UserStore';

const Student = () => {
  const { id } = useLocalSearchParams();
  const [studentData, setStdentData] = useState([]);
  const { studentDetail } = useUserStore();
  console.log('studentDetail', studentDetail);

  const getStudent = studentDetail.filter((student) => student.id === id);

  return (
    <View>
      <Text>{id}</Text>
      <Text>{getStudent.name}</Text>
      <Text>{getStudent.school}</Text>
      <Text>{getStudent.department}</Text>
      <Text>{getStudent.course}</Text>
    </View>
  );
};

export default Student;
