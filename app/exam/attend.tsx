import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter()

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

  return (
    <View>
      <View className='flex flex-col'>
        <View className='h-[16%]'>
        <Text className='text-center text-3xl font-semibold tracking-wider mt-2 py-1'>Scan the QR code</Text>
        <Text className='text-center font-mono text-lg py-1 my-6 text-gray-600'>Point this QR code to the scan place</Text>
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
          <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => console.log('am proud man')}>
            <Text className='p-1 text-white'>Manual Entry</Text>
          </Pressable>
          <Pressable className='bg-black rounded-lg w-12 flex flex-1 justify-center items-center mt-6 py-2' onPress={() => router.back()}>
            <Text className='p-1 text-white'>Back</Text>
          </Pressable>
      </View>
      </View>
    </View>
  );
}