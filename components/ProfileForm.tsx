import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ProfileForm = ({ onSubmit }:any) => {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [school, setSchool] = useState('');
  const [regNumber, setRegNumber] = useState('');

  const handleSubmit = () => {
    const profileData = {
      fullName,
      department,
      school,
      regNumber,
    };
    onSubmit(profileData);
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
      <Button title="Update Profile" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProfileForm;
