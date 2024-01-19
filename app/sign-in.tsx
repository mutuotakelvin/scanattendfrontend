import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSession } from '../ctx';
import useAccountStore from '../store/AccountStore';
import useUserStore from '../store/UserStore';

const SignIn = () => {
  const { login, account }: any = useAccountStore();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user }: any = useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const { session, isLoading, signIn } = useSession();

  const userData = typeof user === 'string' ? JSON.parse(user) : user;

  const handleSignIn = () => {
    const loginData = {
      username,
      password,
    };
    signIn(loginData).then((res) => {
      console.log(res);
      // if (userData.name == null || userData.name == undefined || userData.name == '') {
      //   router.push('/complete-profile');
      // } else {
      //   router.push('/(tabs)/');
      // }
    });
  };

  return (
    <View className='flex flex-col justify-center items-center my-auto h-full bg-[#4E5CFF]'>
      <Text className='text-2xl pb-4 text-white'>Welcome Back</Text>
      <View className='flex flex-row items-center gap-1'>
        <Text className='text-white'>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text className='text-white'>Create a new account</Text>
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
        <TouchableOpacity
          className='bg-[#A1AAFF] border border-white rounded-lg'
          onPress={handleSignIn}
        >
          <Text className='text-white p-1 px-8 text-lg'>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
