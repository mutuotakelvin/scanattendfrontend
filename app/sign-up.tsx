import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

const SignUpScreen = () => {
  const handleSignUp = () => {
    // Implement your sign-up logic here
  };
  const router = useRouter()

  return (
    <View>
        <Text>You have an account?  <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text>Click here</Text>
        </TouchableOpacity>
        </Text>
      <Text>Create an Account</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry={true} />
      <TouchableOpacity onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
