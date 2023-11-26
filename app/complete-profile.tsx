import { View, Text, TouchableOpacity,TextInput } from 'react-native'
import React, {useState} from 'react'
import { useRouter } from 'expo-router'
import { useSession } from '../ctx'
import useUserStores from '@/../../store/UserStore';
import useAccountStore from '../store/AccountStore';



const completeProfile = () => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [school, setSchool] = useState('')
  const [department, setDepartment] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [number, setNumber] = useState('')
  // const {user} = useSession();
  const {user, setUser, clearUser, updateLecturerDetails,updateStudentDetails}:any = useUserStores()
  const {login, account}:any = useAccountStore()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  
  const handleCompleteProfile = () => {
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
    router.push('/(tabs)/')
  }
  return (
    <View className='flex flex-col justify-center items-center my-auto'>
      <Text className='text-xl pb-'>Complete your profile to continue</Text>
      <View>
      </View>
      <View className='flex flex-col items-center space-y-4 w-full mt-4'>
        <TextInput 
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="Full Name" 
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          />
        <TextInput 
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="School" 
          value={school}
          onChangeText={(text) => setSchool(text)}
          />
          <TextInput 
            className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
            placeholder="Department" 
            value={department}
            onChangeText={(text) => setDepartment(text)}
            />
          <TextInput 
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="Phone Number" 
          value={number}
          onChangeText={(text) => setNumber(text)}
          />
        <TextInput 
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="Registration Number" 
          value={regNumber}
          onChangeText={(text) => setRegNumber(text)}
          />
        <View className='flex flex-row items-center gap-6'>
          <TouchableOpacity onPressIn={() => router.back()} className='bg-black rounded-lg'>
            <Text className='text-white p-1 px-8 text-lg'>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressIn={() => handleCompleteProfile()} className='bg-blue-500 rounded-lg'>
            <Text className='text-white p-1 px-8 text-lg'>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default completeProfile