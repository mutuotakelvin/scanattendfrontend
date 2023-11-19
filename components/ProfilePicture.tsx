// ProfilePicture.js
import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfilePicture = ({ source, onSelect }:any) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.container}>
      <Image source={source ? { uri: source } : require('./../assets/images/account.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default ProfilePicture;
