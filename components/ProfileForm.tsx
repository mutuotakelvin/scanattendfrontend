import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text, ScrollView } from 'react-native';
import useUserStores from '../store/UserStore';
import useAccountStore from '../store/AccountStore';
import { Picker } from '@react-native-picker/picker';

const ProfileForm = ({ onSubmit, data }:any) => {
  const {user, setUser, clearUser, updateStudentDetails,updateLecturerDetails}:any = useUserStores()
  const {login, account}:any = useAccountStore()

  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  const userId = account == 'Student' ? userData.student_id : userData.teacher_id
  const [fullName, setFullName] = useState(userData.name);
  const [department, setDepartment] = useState(userData.department);
  const [school, setSchool] = useState(userData.school);
  const [regNumber, setRegNumber] = useState(userId);
  const [number, setNumber] = useState(userData.phone);
  const [course, setCourse] = useState(userData.course);
  const [email, setEmail] = useState(userData.email);


  const handleSubmit = () => {
    if(account == 'Student'){
      const profileData = {
        id:userData.studentId,
        fullName,
        school,
        department,
        regNumber,
        number,
        course,
        email
      };
      updateStudentDetails(profileData)
    }
    else if(account == 'Lecturer'){
      const profileData = {
        id:userData.teacherId,
        fullName,
        school,
        department,
        regNumber,
        number,
        course,
        email
      };
      updateLecturerDetails(profileData)
    }
  };

  return (
    <ScrollView className='py-10'>
      <View className=' py-1'>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
      </View>
      <View className='mb-4 py-2'>
        <Picker
          selectedValue={department}
          style={{ height: 5, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
        >
          <Picker.Item label='Select Department' value='' />
          <Picker.Item label="Computing and IT" value="Computing and IT" />
          <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
          <Picker.Item label="Civil Engineering" value="Civil Engineering" />
          <Picker.Item label="Electrical and Telecommunication" value="Electrical and Telecommunication" />
          <Picker.Item label="Education" value="Education" />
        </Picker>
      </View>
      <View className='mb-4 py-2'>
        <Picker
          selectedValue={school}
          style={{ height: 5, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
        >
          <Picker.Item label='Select School' value='' />
          <Picker.Item label="School of Computing" value="School of Computing" />
          <Picker.Item label="School of Engineering" value="School of Engineering" />
          <Picker.Item label="School of Education" value="School of Education" />
        </Picker>
      </View>
      <View className='mb-4 py-2'>
        <TextInput
          placeholder="Registration Number"
          value={regNumber}
          onChangeText={(text) => setRegNumber(text)}
          style={styles.input}
        />
      </View>
      <View className='mb-4 py-2'>
        <TextInput
          placeholder="Phone Number"
          value={number}
          onChangeText={(text) => setNumber(text)}
          style={styles.input}
        />
      </View>
      <View className='mb-4 py-2'>
        <Picker
          selectedValue={course}
          style={{ height: 5, width: 260 }}
          onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
        >
          <Picker.Item label='Select Course' value='' />
          <Picker.Item label="Computer Science" value="Computer Science" />
          <Picker.Item label="Software Engineering" value="Software Engineering" />
          <Picker.Item label="Computer Engineering" value="Computer Engineering" />
          <Picker.Item label="Information Technology" value="Information Technology" />
          <Picker.Item label="Electrical Engineering" value="Electrical Engineering" />
          <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
          <Picker.Item label="Civil Engineering" value="Civil Engineering" />
          <Picker.Item label="Education" value="Education" />
        </Picker>
      </View>
      <View className='mb-4 py-2'>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>
      <Button title="Update Profile" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '80%',
  },
  input: {
    marginBottom: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProfileForm;
