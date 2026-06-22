import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

export default function CreatePostScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    const [postText, setPostText] = useState('');

    const handlePost = () => {
        console.log('Posting:', postText);
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#ffffff' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={true} />
            
            {/* Header */}
            <View 
                className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white"
                style={{ paddingTop: insets.top ? insets.top + 10 : 12 }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" activeOpacity={0.7}>
                    <Icon name="x" size={26} color="#1f2937" />
                </TouchableOpacity>
                
                <Text className="text-black font-semibold text-[17px]">Create post</Text>
                
                <TouchableOpacity 
                    onPress={handlePost} 
                    disabled={postText.trim().length === 0}
                    className={`px-5 py-1.5 rounded-md ${postText.trim().length > 0 ? 'bg-[#f97316]' : 'bg-gray-100'}`}
                    activeOpacity={0.8}
                >
                    <Text className={`font-semibold text-[15px] ${postText.trim().length > 0 ? 'text-white' : 'text-gray-400'}`}>
                        POST
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-white" bounces={true} showsVerticalScrollIndicator={false}>
                {/* User Info & Privacy */}
                <View className="flex-row px-4 pt-4 pb-2 items-center">
                    <Image
                        source={user?.profileImage || require('../assets/images/logo.png')}
                        className="w-12 h-12 rounded-full bg-gray-100"
                        resizeMode="cover"
                    />
                    <View className="ml-3 justify-center">
                        <Text className="text-black font-bold text-[16px] mb-1">
                            {user?.name || 'Sajal Mondal'}
                        </Text>
                        
                        <View className="flex-row items-center">
                            {/* Privacy Selector - Using Purple Theme */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-purple-50 border border-purple-100 rounded-md px-2 py-1 mr-2"
                                activeOpacity={0.7}
                            >
                                <Icon name="globe" size={13} color="#9333ea" />
                                <Text className="text-purple-700 text-[13px] font-semibold mx-1.5">Public</Text>
                                <Icon name="chevron-down" size={14} color="#9333ea" />
                            </TouchableOpacity>

                            {/* Album Selector */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-gray-50 border border-gray-200 rounded-md px-2 py-1"
                                activeOpacity={0.7}
                            >
                                <Icon name="plus" size={13} color="#4b5563" />
                                <Text className="text-gray-700 text-[13px] font-semibold mx-1.5">Album</Text>
                                <Icon name="chevron-down" size={14} color="#4b5563" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Text Input Area */}
                <View className="px-4 py-2 min-h-[250px]">
                    <TextInput
                        className="text-gray-800 text-[20px] leading-7"
                        placeholder="What's on your mind?"
                        placeholderTextColor="#9ca3af"
                        multiline
                        autoFocus
                        value={postText}
                        onChangeText={setPostText}
                        style={{ textAlignVertical: 'top' }}
                    />
                </View>
            </ScrollView>

            {/* Bottom Attachments Menu - Classic Facebook Style */}
            <View className="border-t border-gray-200 bg-white">
                <TouchableOpacity 
                    className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 shadow-sm"
                    activeOpacity={0.7}
                >
                    <Text className="text-gray-800 font-medium text-[15px]">Add to your post</Text>
                    <View className="flex-row items-center gap-x-5">
                        <MaterialIcon name="photo-library" size={26} color="#10b981" />
                        <MaterialIcon name="person-add" size={26} color="#3b82f6" />
                        <MaterialIcon name="emoji-emotions" size={26} color="#f59e0b" />
                        <MaterialIcon name="location-on" size={26} color="#ef4444" />
                        <MaterialIcon name="videocam" size={28} color="#ef4444" />
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
