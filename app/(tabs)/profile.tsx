import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import ProfileForm from '../../components/ProfileForm'
import ProfilePicture from '../../components/ProfilePicture'
import {useSession, } from '../../ctx';
import useUserStore from '../../store/UserStore';


const profile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const { signOut} = useSession();
  const {user}:any = useUserStore()

  const handlePictureSelect = (uri:any) => {
    setProfilePicture(uri);
  };

  const handleProfileUpdate = (profileData:any) => {
    // Handle the logic to update the profile with profileData
    // You can send this data to your server or update local state accordingly
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
  };
  const userData = typeof user === 'string' ? JSON.parse(user) : user;
  return (
    <View style={styles.container}>
      <ProfilePicture source={profilePicture} onSelect={handlePictureSelect} />
      <ProfileForm data={userData} onSubmit={handleProfileUpdate} />
      <TouchableOpacity onPress={() =>signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default profile