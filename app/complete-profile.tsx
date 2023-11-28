import { View, Text, TouchableOpacity,TextInput } from 'react-native'
import React, {useState} from 'react'
import { useRouter } from 'expo-router'
import { useSession } from '../ctx'
import useUserStores from '@/../../store/UserStore';
import useAccountStore from '../store/AccountStore';



const completeProfile = () => {
  const router = useRouter()
  const {user, setUser, clearUser, updateLecturerDetails,updateStudentDetails}:any = useUserStores()
  const {login, account}:any = useAccountStore()

  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  const userId = account == 'Student' ? userData.student_id : userData.teacher_id

  const [fullName, setFullName] = useState(userData.name)
  const [school, setSchool] = useState(userData.school)
  const [department, setDepartment] = useState(userData.department)
  const [regNumber, setRegNumber] = useState(userId)
  const [number, setNumber] = useState(userData.phone)
  const [course, setCourse] = useState(userData.course)
  const [email, setEmail] = useState(userData.email)
  // const {user} = useSession();
  
  const handleCompleteProfile = () => {
    if(account == 'Student'){
      const profileData = {
        id:userData.studentId,
        fullName,
        school,
        department,
        regNumber,
        number,
        course,
        email
      };
      updateStudentDetails(profileData)
      router.push('/(tabs)/')
    }
    else if(account == 'Lecturer'){
      const profileData = {
        id:userData.teacherId,
        fullName,
        school,
        department,
        regNumber,
        number,
        course,
        email
      };
      updateLecturerDetails(profileData)
      console.log('Profile Data', profileData)
      router.push('/(tabs)/')
    }
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
        <TextInput
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="Course" 
          value={course}
          onChangeText={(text) => setCourse(text)}
          />
        <TextInput
          className='border border-gray-500 w-[60%] px-1 focus:border-blue-400 rounded-lg' 
          placeholder="Email" 
          value={email}
          onChangeText={(text) => setEmail(text)}
          />
        <View className='flex flex-row items-center gap-6'>
          <TouchableOpacity onPressIn={() => router.back()} className='bg-black rounded-lg'>
            <Text className='text-white p-1 px-8 text-lg'>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPressIn={() => handleCompleteProfile()} className='bg-blue-500 rounded-lg'>
            <Text className='text-white p-1 px-8 text-lg'>
              Complete
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPressIn={() => router.push('/(tabs)/')} className='bg-black rounded-lg'>
            <Text className='text-white p-1 px-8 text-lg'>Continue</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

export default completeProfile