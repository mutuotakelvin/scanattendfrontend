import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Text } from 'react-native';
import useUserStores from '../store/UserStore';
import useAccountStore from '../store/AccountStore';

const ProfileForm = ({ onSubmit }:any) => {
  const {user, setUser, clearUser, updateStudentDetails,updateLecturerDetails}:any = useUserStores()
  const {login, account}:any = useAccountStore()

  const userData = typeof user === 'string' ? JSON.parse(user) : user;

  const [fullName, setFullName] = useState(userData.name);
  const [department, setDepartment] = useState(userData.department);
  const [school, setSchool] = useState(userData.school);
  const [regNumber, setRegNumber] = useState(userData.student_id);
  const [number, setNumber] = useState(userData.phone);


  const handleSubmit = () => {
    if(account == 'Student'){
      const profileData = {
        id:userData.studentId,
        fullName,
        school,
        department,
        regNumber,
        number
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
        number
      };
      updateLecturerDetails(profileData)
    }
  };

  return (
    <View style={styles.container}>
      <Text>{userData.name}</Text>
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
