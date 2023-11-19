import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const signin = () => {
    const router = useRouter()
    const handleSignIn = () => {
        // Implement your sign-in logic here
      };
    
      return (
        <View>
          <Text>Sign In</Text>
          <TextInput placeholder="Username" />
          <TextInput placeholder="Password" secureTextEntry={true} />
          <TouchableOpacity onPress={handleSignIn}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      );
}

export default signin