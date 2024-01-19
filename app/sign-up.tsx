import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icon from Expo vector icons
import { useRouter } from 'expo-router';
import useAccountStore from '../store/AccountStore';
import { useSession } from '../ctx';

const SignUpScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp }: any = useSession();
  const [message, setMessage] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Password does not match');
      // setMessage('Password does not match');
      return;
    }

    const userData = {
      username,
      password,
    };
    signUp(userData);
    // router.push('/sign-in')
  };

  return (
    <View className='flex flex-col justify-center items-center my-auto h-full bg-[#4E5CFF]'>
      <Text className='text-2xl pb-4 text-white'>Create an Account</Text>
      <View className='flex flex-row items-center gap-1'>
        <Text className='text-white'>You have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-in')} className='cursor-pointer' >
          <Text className='underline underline-white text-white'>Click here</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col items-center space-y-4 w-full mt-4'>
        <TextInput
          className='border border-white text-white w-[60%] px-1 focus:border-[#A1AAFF] rounded-lg'
          placeholder='Username'
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View className='input-container'>
          <TextInput
            className='border border-white text-white w-[250px] px-1 focus:border-[#A1AAFF] rounded-lg'
            placeholder='Password'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 10 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <View className='input-container'>
          <TextInput
            className='border border-white text-white w-[250px] px-1 focus:border-[#A1AAFF] rounded-lg'
            placeholder='Confirm Password'
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={(text) => setConfirm(text)}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 10 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='white'
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignUp} className='bg-[#A1AAFF] border border-white rounded-lg'>
          <Text className='text-white p-1 px-8 text-lg'>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
