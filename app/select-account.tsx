import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Account from '../components/Account'
import { useRouter } from 'expo-router'
import useAccountStore from '../store/AccountStore'

const selectAccount = () => {
    const {login,account, setAccount}:any = useAccountStore()
    const router = useRouter()
    const [user, setUser] = useState('student')
    const handleSelectAccount = (accountType:string ) => {
        setAccount(accountType)
        if(login){ 
          router.push('/sign-in')
        }
        else{
          router.push('/sign-up')
        }
    }
  return (
    <View className='flex flex-col justify-center items-center my-auto'>
      <Text className='mb-12 font-medium text-2xl'>{
        login ? 'Login' : 'Sign Up'
      
      } As</Text>
      <View className='flex flex-row items-center gap-6'>
        <TouchableOpacity className='rounded-lg h-20 w-[20%] bg-black flex flex-row justify-center items-center my-auto' onPress={() => handleSelectAccount("Student")}>
          <Text className='text-white text-lg'>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity className='rounded-lg h-20 w-[20%] bg-black flex flex-row justify-center items-center my-auto' onPress={() => handleSelectAccount("Lecturer")}>
          <Text className='text-white text-lg'>Lecturer</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default selectAccount