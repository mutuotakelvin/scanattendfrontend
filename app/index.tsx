import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated,{FadeIn, FadeInDown, FadeOut} from 'react-native-reanimated';
import { useRouter } from 'expo-router';



const index = () => {
  const router = useRouter()
  return (
    <View className='flex-1 justify-center items-center'>
      <StatusBar style="light" />
      <Image className='h-full w-full absolute' source={require('../assets/images/welcome.png')} />
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{width:wp(100), height:hp(105)}}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className='flex justify-end pb-32'
      >
        <View className='flex items-center'>
          <Animated.View entering={FadeInDown.delay(100).springify()} className='flex flex-row justify-center items-center'>
            <Text style={{fontSize:hp(5)}} className='text-white  font-bold tracking-wide'>Scan</Text>
            <Text style={{fontSize:hp(5)}} className='text-blue-500 font-bold tracking-wide'>Attend</Text>
          </Animated.View>
        <Animated.Text entering={FadeInDown.delay(150).damping(4)} style={{fontSize:hp(2)}} className='text-white text-xl font-medium'>Attendance made easy</Animated.Text>
        </View>
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/') }
            style={{height:hp(7),width:wp(80)}}
            className='bg-blue-500 rounded-full flex justify-center items-center border-2 border-blue-100 mx-auto'
          >
            <Text style={{fontSize:hp(3)}} className='text-white font-bold tracking-widest'>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  )
}

export default index
{/* <Text className='text-white text-2xl font-bold'>ScanAttend is a mobile application that helps you take attendance with ease</Text> */}