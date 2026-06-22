import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function CreatePost() {
    const { user } = useAuth();
    const navigation = useNavigation();

    const handleImageSelect = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorMessage);
            } else if (result.assets && result.assets.length > 0) {
                const source = result.assets[0];
                console.log('Selected image URI:', source.uri);
                // Future: Add logic to display the selected image or upload to server
            }
        } catch (error) {
            console.error("Error launching image library:", error);
        }
    };

    return (
        <View className="px-4 py-3 flex-row items-center border-b border-gray-200/40">
            {/* User Profile Image */}
            <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)} activeOpacity={0.8}>
                <Image
                    source={user?.profileImage || require('../assets/images/logo.png')}
                    className="w-9 h-9 rounded-full border border-gray-100 shadow-sm"
                    resizeMode="cover"
                />
            </TouchableOpacity>

            {/* "What's on your mind?" Input Mock */}
            <TouchableOpacity
                className="flex-1 mx-3 h-10 rounded-full bg-purple-200/60 justify-center px-4 shadow-sm border border-gray-100"
                activeOpacity={0.7}
                onPress={() => navigation.navigate('CreatePostScreen' as never)}
            >
                <Text className="text-gray-500 font-medium text-[14px]">
                    What's on your mind?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="items-center justify-center p-2"
                onPress={handleImageSelect}
                activeOpacity={0.7}
            >
                <Icon name="image" size={24} color="#f97316" />
            </TouchableOpacity>
        </View>
    );
}
