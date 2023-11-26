import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import {useSession, } from '../ctx';
import useAccountStore from '../store/AccountStore';


const signin = () => {
    const {login, account}:any = useAccountStore()
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { session, isLoading, signIn} = useSession();


    const handleSignIn = () => {
        // Implement your sign-in logic here
        const loginData = {
            username,
            password,
        };
        signIn(loginData).then((res) => {
            console.log(res)
        }
        )
        router.push('/(tabs)/')
      };
    
      return (
        <View className='flex flex-col justify-center items-center my-auto'>
          <Text className='text-2xl pb-'>Welcome To ScanAttend</Text>
          <View className='flex flex-row items-center gap-1'>
            <Text>Don't have an account? </Text>
            <Text>{account}</Text>
            <TouchableOpacity onPress={() => router.push('/select-account')}>
              <Text>Create a new account</Text>
            </TouchableOpacity>
          </View>
          <View className='flex flex-col items-center space-y-4 w-full mt-4'>
            <TextInput 
            className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
            placeholder="Username" 
            value={username}
            onChangeText={(text) => setUsername(text)} />
            <TextInput 
            className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
            placeholder="Password" secureTextEntry={true} 
            value={password}
            onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity 
            className='bg-blue-500 rounded-lg' onPress={handleSignIn}>
              <Text className='text-white p-1 px-8 text-lg'>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
}

export default signin