import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useUserStores from '../../store/UserStore';
import useExamStore from '../../store/ExamStore';

export default function App() {
  const {exams}:any = useExamStore()
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter()
  const {id} = useLocalSearchParams()

  const {user}:any = useUserStores()
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  const exam :any = exams.find((exam:any) => exam.id == id)
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }:any) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleManualEntry = async() => {
    console.log('Exam id', id)
    console.log('Student id', userData.id)
    const attendData = {
      exam: id,
      student_id: userData.id
    }
    try {
      const res = await fetch('http://10.0.2.2:8000/api/exam-attendance/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attendData)
      })
      const response = await res.json()
      Alert.alert('Success', 'Attendance recorded successfully')
      router.back()
      console.log('response', response)
    } catch (error) {
      Alert.alert('Error', 'Something went wrong')
    }

  }

  return (
    <View>
      <View className='flex flex-col bg-[#4E5CFF]'>
        <View className='h-[16%]'>
        <Text className='text-center text-white text-3xl font-semibold tracking-wider mt-2 py-1'>Scan the QR code to attend</Text>
        <Text className='text-center text-white font-mono text-lg py-1 my-6'>Point this QR code to the scan place</Text>
        </View>
        <View className='h-[70%] mt-3 rounded-lg w-[85%] mx-auto'>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
        <View className='flex flex-row justify-between items-center space-x-4 px-2'>
          <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={handleManualEntry}>
            <Text className='p-1 text-white'>Manual Entryy</Text>
          </Pressable>
          <Pressable className='bg-[#A1AAFF] border border-white rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => router.back()}>
            <Text className='p-1 text-white'>Back</Text>
          </Pressable>
      </View>
      </View>
    </View>
  );
}