import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    
    const [activeTab, setActiveTab] = useState('Posts');
    const tabs = ['Posts', 'Photos', 'Reels', 'About'];

    const handleImageSelect = async (type: 'profile' | 'cover') => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (!result.didCancel && !result.errorCode && result.assets && result.assets.length > 0) {
                console.log(`Selected ${type} image:`, result.assets[0].uri);
                // Implementation for updating image will go here
            }
        } catch (error) {
            console.error(`Error launching image library for ${type}:`, error);
        }
    };

    return (
        <LinearGradient
            colors={['#fff7ed', '#faf5ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Cover Photo Section */}
                <View className="relative bg-white pb-4 shadow-sm">
                    <View>
                        <Image
                            source={user?.coverImage || require('../assets/images/user/user_cover_1.jpeg')}
                            className="w-full h-56"
                            resizeMode="cover"
                        />
                        {/* Header Back Button & Search */}
                        <View 
                            className="absolute left-0 right-0 flex-row justify-between items-center px-4"
                            style={{ top: insets.top ? insets.top + 10 : 20 }}
                        >
                            <TouchableOpacity 
                                className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.7}
                            >
                                <Icon name="arrow-left" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <Icon name="search" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Change Cover Photo Button */}
                        <TouchableOpacity 
                            className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 rounded-md flex-row items-center gap-x-2"
                            activeOpacity={0.8}
                            onPress={() => handleImageSelect('cover')}
                        >
                            <Icon name="camera" size={16} color="#1f2937" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Photo Section */}
                    <View className="px-4 mt-[-50px] relative items-start">
                        <View className="relative">
                            <Image
                                source={user?.profileImage || require('../assets/images/logo.png')}
                                className="w-36 h-36 rounded-full border-4 border-white bg-white"
                            />
                            {/* Change Profile Photo Button */}
                            <TouchableOpacity 
                                className="absolute bottom-1 right-1 w-10 h-10 bg-gray-200 rounded-full items-center justify-center border-2 border-white"
                                activeOpacity={0.8}
                                onPress={() => handleImageSelect('profile')}
                            >
                                <Icon name="camera" size={20} color="#1f2937" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* User Info Section */}
                    <View className="px-4 mt-3">
                        <Text className="text-2xl font-bold text-gray-900">{user?.name || 'User Name'}</Text>
                        <Text className="text-gray-500 mt-1">@{user?.username || 'username'}</Text>
                        
                        <View className="flex-row items-center mt-3 gap-x-2">
                            <TouchableOpacity className="flex-1 rounded-md" activeOpacity={0.8}>
                                <LinearGradient
                                    colors={['#f97316', '#a855f7']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="py-2 rounded-md items-center flex-row justify-center gap-x-2"
                                >
                                    <Icon name="plus" size={18} color="#fff" />
                                    <Text className="text-white font-semibold">Add to Story</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-1 bg-gray-200 py-2 rounded-md items-center flex-row justify-center gap-x-2">
                                <Icon name="edit-2" size={16} color="#1f2937" />
                                <Text className="text-gray-900 font-semibold">Edit Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="w-10 bg-gray-200 py-2 rounded-md items-center justify-center">
                                <Icon name="more-horizontal" size={20} color="#1f2937" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Tabs Menu Bar */}
                <View className="bg-white mt-2 px-4 shadow-sm">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {tabs.map((tab) => (
                            <TouchableOpacity 
                                key={tab}
                                className={`py-4 mr-6 border-b-2 ${activeTab === tab ? 'border-[#f97316]' : 'border-transparent'}`}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text className={`font-semibold text-[15px] ${activeTab === tab ? 'text-[#f97316]' : 'text-gray-500'}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Content Section based on Tab */}
                <View className="mt-2 bg-white p-4 min-h-[300px]">
                    <Text className="text-gray-500 text-center mt-10">
                        {activeTab} content will appear here
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

