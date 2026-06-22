import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

export default function CreatePostScreen() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { user } = useAuth();
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handlePost = () => {
        console.log('Posting:', postText, 'Image:', selectedImage);
        navigation.goBack();
    };

    const handleAddPhoto = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
            });

            if (!result.didCancel && result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri || null);
            }
        } catch (error) {
            console.error("Error launching image library:", error);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#f3f4f6' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" translucent={true} />
            
            {/* Header */}
            <View 
                className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200"
                style={{ paddingTop: insets.top ? insets.top + 10 : 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 }}
            >
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2" activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text className="text-black font-semibold text-[18px] ml-4">Create post</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={handlePost} 
                    disabled={postText.trim().length === 0 && !selectedImage}
                    className={`px-6 py-2 rounded-lg ${(postText.trim().length > 0 || selectedImage) ? 'bg-[#f97316]' : 'bg-gray-200'}`}
                    activeOpacity={0.8}
                >
                    <Text className={`font-bold text-[15px] ${(postText.trim().length > 0 || selectedImage) ? 'text-white' : 'text-gray-400'}`}>
                        POST
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-white" bounces={true} showsVerticalScrollIndicator={false}>
                {/* User Info & Privacy */}
                <View className="flex-row px-4 pt-5 pb-3 items-center">
                    <Image
                        source={user?.profileImage || require('../assets/images/logo.png')}
                        className="w-[50px] h-[50px] rounded-full bg-gray-100 border border-gray-200"
                        resizeMode="cover"
                    />
                    <View className="ml-3 justify-center">
                        <Text className="text-black font-bold text-[16px] mb-1.5">
                            {user?.name || 'Sajal Mondal'}
                        </Text>
                        
                        <View className="flex-row items-center">
                            {/* Privacy Selector */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-purple-50 border border-purple-200 rounded-md px-2.5 py-1 mr-2"
                                activeOpacity={0.7}
                            >
                                <Icon name="users" size={12} color="#9333ea" />
                                <Text className="text-purple-700 text-[13px] font-semibold mx-1.5">Friends</Text>
                                <Icon name="chevron-down" size={14} color="#9333ea" />
                            </TouchableOpacity>

                            {/* Album Selector */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1"
                                activeOpacity={0.7}
                            >
                                <Icon name="plus" size={12} color="#4b5563" />
                                <Text className="text-gray-700 text-[13px] font-semibold mx-1.5">Album</Text>
                                <Icon name="chevron-down" size={14} color="#4b5563" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Text Input Area */}
                <View className="px-4 py-2">
                    <TextInput
                        className="text-gray-800 text-[22px] leading-8"
                        placeholder="What's on your mind?"
                        placeholderTextColor="#9ca3af"
                        multiline
                        autoFocus
                        value={postText}
                        onChangeText={setPostText}
                        style={{ minHeight: selectedImage ? 100 : 200, textAlignVertical: 'top' }}
                    />
                </View>

                {/* Selected Image Preview */}
                {selectedImage && (
                    <View className="mx-4 mt-2 mb-4 rounded-xl overflow-hidden relative border border-gray-200">
                        <Image 
                            source={{ uri: selectedImage }} 
                            style={{ width: width - 32, height: (width - 32) * 1.2 }} 
                            resizeMode="cover" 
                        />
                        <TouchableOpacity 
                            className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full items-center justify-center backdrop-blur-md"
                            onPress={() => setSelectedImage(null)}
                            activeOpacity={0.8}
                        >
                            <Icon name="x" size={18} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Menu List - Premium Facebook Style */}
            <View className="bg-white border-t border-gray-200 pb-5" style={{ elevation: 15, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 6 }}>
                <View className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex-row justify-between items-center">
                    <Text className="text-gray-500 font-semibold text-[13px] uppercase tracking-wider">Add to your post</Text>
                </View>
                
                {/* Options List */}
                <View>
                    <TouchableOpacity 
                        className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                        activeOpacity={0.7}
                        onPress={handleAddPhoto}
                    >
                        <MaterialIcon name="photo-library" size={28} color="#10b981" />
                        <Text className="text-black text-[16px] font-medium ml-4">Photo/video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                        activeOpacity={0.7}
                        onPress={() => console.log('Tag people')}
                    >
                        <MaterialIcon name="person-add-alt-1" size={28} color="#3b82f6" />
                        <Text className="text-black text-[16px] font-medium ml-4">Tag people</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center px-4 py-3.5 border-b border-gray-100"
                        activeOpacity={0.7}
                        onPress={() => console.log('Feeling/activity')}
                    >
                        <MaterialIcon name="emoji-emotions" size={28} color="#f59e0b" />
                        <Text className="text-black text-[16px] font-medium ml-4">Feeling/activity</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className="flex-row items-center px-4 py-3.5"
                        activeOpacity={0.7}
                        onPress={() => console.log('Check in')}
                    >
                        <MaterialIcon name="location-on" size={28} color="#ef4444" />
                        <Text className="text-black text-[16px] font-medium ml-4">Check in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
