import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

const SignUpScreen = () => {
  const router = useRouter()
  const handleSignUp = () => {
    // Implement your sign-up logic here
    router.push('/sign-in')
  };

  return (
    <View className='flex flex-col justify-center items-center my-auto'>
      <Text className='text-2xl pb-'>Create an Account</Text>
      <View className='flex flex-row items-center gap-1'>
        <Text>You have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text className=''>Click here</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col items-center space-y-4 w-full mt-4'>
        <TextInput className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' placeholder="Username" />
        <TextInput className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' placeholder="Password" secureTextEntry={true} />
        <TextInput className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' placeholder="Confirm Password" secureTextEntry={true} />
        <TouchableOpacity onPress={handleSignUp} className='bg-blue-500 rounded-lg'>
          <Text className='text-white p-1 px-8 text-lg'>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
