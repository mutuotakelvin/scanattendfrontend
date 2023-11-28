import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
import useUserStores from '../store/UserStore';
import useAccountStore from '../store/AccountStore';

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
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Department"
        value={department}
        onChangeText={(text) => setDepartment(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="School"
        value={school}
        onChangeText={(text) => setSchool(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Registration Number"
        value={regNumber}
        onChangeText={(text) => setRegNumber(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={number}
        onChangeText={(text) => setNumber(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Course"
        value={course}
        onChangeText={(text) => setCourse(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
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
