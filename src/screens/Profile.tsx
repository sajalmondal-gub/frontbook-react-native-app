import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';
import { dummyPhotos, dummyReels, dummyAbout } from '../data/profileData';

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
                <View className="mt-2 min-h-[300px] pb-10">
                    {activeTab === 'Posts' && (
                        <View>
                            {posts.filter(p => p.userId === user?.id).length > 0 ? (
                                posts.filter(p => p.userId === user?.id).map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            ) : (
                                <View className="bg-white p-6 items-center justify-center mt-2">
                                    <Text className="text-gray-500 font-medium">No posts available</Text>
                                </View>
                            )}
                        </View>
                    )}

                    {activeTab === 'Photos' && (
                        <View className="bg-white mt-1 p-4 rounded-b-2xl shadow-sm">
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-gray-900 text-xl font-extrabold tracking-tight">Photos</Text>
                                <TouchableOpacity>
                                    <Text className="text-[#f97316] font-semibold">See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row flex-wrap -mx-1">
                                {dummyPhotos.map((photo, index) => (
                                    <View key={index} style={{ width: '33.33%' }} className="p-1 aspect-square">
                                        <Image source={{ uri: photo }} className="w-full h-full rounded-xl" resizeMode="cover" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {activeTab === 'Reels' && (
                        <View className="bg-white mt-1 p-4 rounded-b-2xl shadow-sm">
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-gray-900 text-xl font-extrabold tracking-tight">Reels</Text>
                                <TouchableOpacity>
                                    <Text className="text-[#f97316] font-semibold">See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row flex-wrap -mx-1">
                                {dummyReels.map((reel) => (
                                    <View key={reel.id} style={{ width: '33.33%' }} className="p-1 aspect-[9/16]">
                                        <View className="w-full h-full relative rounded-xl overflow-hidden">
                                            <Image source={{ uri: reel.thumbnail }} className="w-full h-full" resizeMode="cover" />
                                            {/* Gradient Overlay for Text Readability */}
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.6)']}
                                                className="absolute bottom-0 left-0 right-0 h-1/2 justify-end p-2"
                                            >
                                                <View className="flex-row items-center gap-x-1.5">
                                                    <Icon name="play" size={14} color="#fff" />
                                                    <Text className="text-white text-xs font-bold tracking-wider">{reel.views}</Text>
                                                </View>
                                            </LinearGradient>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {activeTab === 'About' && (
                        <View className="bg-white mt-1 p-5 rounded-b-2xl shadow-sm">
                            <Text className="text-gray-900 text-xl font-extrabold tracking-tight mb-5">About</Text>
                            
                            <View className="flex-row items-start mb-6">
                                <View className="w-10 h-10 rounded-full bg-orange-100 items-center justify-center mt-1">
                                    <Icon name="user" size={20} color="#f97316" />
                                </View>
                                <View className="ml-4 flex-1 border-b border-gray-100 pb-4">
                                    <Text className="text-gray-800 text-[15px] leading-6 font-medium">
                                        {dummyAbout.bio}
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row items-center mb-6">
                                <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center">
                                    <Icon name="briefcase" size={20} color="#a855f7" />
                                </View>
                                <View className="ml-4 flex-1 border-b border-gray-100 pb-4">
                                    <Text className="text-gray-800 text-[15px] font-medium">
                                        {dummyAbout.work}
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row items-center mb-6">
                                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                                    <Icon name="book" size={20} color="#3b82f6" />
                                </View>
                                <View className="ml-4 flex-1 border-b border-gray-100 pb-4">
                                    <Text className="text-gray-800 text-[15px] font-medium">
                                        {dummyAbout.education}
                                    </Text>
                                </View>
                            </View>
                            
                            <View className="flex-row items-center mb-6">
                                <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
                                    <Icon name="map-pin" size={20} color="#22c55e" />
                                </View>
                                <View className="ml-4 flex-1 border-b border-gray-100 pb-4">
                                    <Text className="text-gray-800 text-[15px] font-medium">
                                        {dummyAbout.location}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row items-center mb-2">
                                <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                                    <Icon name="clock" size={20} color="#6b7280" />
                                </View>
                                <View className="ml-4 flex-1">
                                    <Text className="text-gray-800 text-[15px] font-medium">
                                        {dummyAbout.joined}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

