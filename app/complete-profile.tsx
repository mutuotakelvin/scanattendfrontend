import { View, Text, TouchableOpacity,TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import { useRouter } from 'expo-router'
import { useSession } from '../ctx'
import useUserStores from '@/../../store/UserStore';
import useAccountStore from '../store/AccountStore';
import { Picker } from '@react-native-picker/picker';



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

  const isValidEmail = (input: string) => {
    // You can implement a more sophisticated email validation logic if needed
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };
  
  const handleCompleteProfile = () => {

    if (!/^\d+$/.test(number)) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }
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
    <View className='flex flex-col justify-center items-center mt-10 bg-[#4E5CFF] h-full'>
      <Text className='text-xl pb-4 text-white'>Complete your profile to continue</Text>
      <View>
      </View>
      <View className='flex flex-col items-center space-y-4 w-full mt-4'>
        <TextInput 
          className='border border-white text-white w-[60%] px-1 focus:border-[#A1AAFF] rounded-lg' 
          placeholder="Full Name" 
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          />
        <Picker
          selectedValue={school}
          style={{ height: 25, width: 260, color:'white' }}
          onValueChange={(itemValue, itemIndex) => setSchool(itemValue)}
        >
          <Picker.Item label='Select School' value='' />
          <Picker.Item label="School of Computing" value="School of Computing" />
          <Picker.Item label="School of Engineering" value="School of Engineering" />
          <Picker.Item label="School of Business" value="School of Business" />
          <Picker.Item label="School of Science" value="School of Science" />
        </Picker>
        <Picker
          selectedValue={department}
          style={{ height: 25, width: 260, color:'white' }}
          onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
        >
          <Picker.Item label='Select Department' value='' />
          <Picker.Item label="Computer Science" value="Computing and IT" />
          <Picker.Item label="Software Engineering" value="Software Engineering" />
          <Picker.Item label="Computer Engineering" value="Computer Engineering" />
        </Picker>
          <TextInput 
          className='border border-white text-white w-[60%] px-1 focus:border-[#A1AAFF] rounded-lg' 
          placeholder="Phone Number" 
          value={number}
          onChangeText={(text) => setNumber(text)}
          />
        <TextInput 
          className='border border-white text-white w-[60%] px-1 focus:border-[#A1AAFF] rounded-lg' 
          placeholder="Registration Number" 
          value={regNumber}
          onChangeText={(text) => setRegNumber(text)}
          />

        <Picker
          selectedValue={course}
          className='text-white'
          style={{ height: 25, width: 260, color:'white' }}
          onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
        >
          <Picker.Item label='Select Course' value='' />
          <Picker.Item label="Computer Science" value="Computer Science" />
          <Picker.Item label="Information Technology" value="Information Technology" />
          <Picker.Item label="Software Engineering" value="Software Engineering" />
          <Picker.Item label="Computer Engineering" value="Computer Engineering" />
        </Picker>
        <TextInput
          className='border border-white text-white w-[60%] px-1 focus:border-[#A1AAFF] rounded-lg' 
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
        </View>
      </View>
    </View>
  )
}

export default completeProfile