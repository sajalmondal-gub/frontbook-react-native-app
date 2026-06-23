import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

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
        <LinearGradient
            colors={['#fff7ed', '#faf5ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
                
                {/* Header */}
                <View 
                    className="flex-row items-center justify-between px-4 py-3 bg-white"
                    style={{ paddingTop: insets.top ? insets.top + 10 : 20 }}
                >
                    <View className="flex-row items-center">
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()} 
                            className="p-2 -ml-2"
                            activeOpacity={0.7}
                        >
                            <Icon name="arrow-left" size={26} color="#1f2937" />
                        </TouchableOpacity>
                        <Text className="text-gray-900 font-bold text-[18px] ml-3">Create Post</Text>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={handlePost} 
                        disabled={postText.trim().length === 0 && !selectedImage}
                        activeOpacity={0.8}
                        className={`px-5 py-1.5 rounded-md ${(postText.trim().length > 0 || selectedImage) ? 'bg-[#f97316]' : 'bg-gray-200'}`}
                    >
                        <Text className={`font-semibold text-[15px] ${(postText.trim().length > 0 || selectedImage) ? 'text-white' : 'text-gray-400'}`}>
                            POST
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    className="flex-1" 
                    bounces={true} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* User Info & Privacy */}
                    <View className="flex-row px-4 pt-4 pb-2 items-center">
                        <View className="relative">
                            <Image
                                source={user?.profileImage || require('../assets/images/logo.png')}
                                className="w-11 h-11 rounded-full bg-white border border-gray-100"
                                resizeMode="cover"
                            />
                        </View>

                        <View className="ml-3 justify-center">
                            <Text className="text-gray-900 font-bold text-[16px] mb-1">
                                {user?.name || 'Sajal Mondal'}
                            </Text>
                            
                            <View className="flex-row items-center">
                                {/* Privacy Selector - "Who can see this post?" */}
                                <TouchableOpacity 
                                    className="flex-row items-center bg-gray-100/80 rounded-md px-2 py-1 mr-2"
                                    activeOpacity={0.7}
                                >
                                    <Icon name="users" size={12} color="#4b5563" />
                                    <Text className="text-gray-700 text-[12px] font-semibold mx-1.5">Friends</Text>
                                    <Icon name="chevron-down" size={14} color="#4b5563" />
                                </TouchableOpacity>

                                {/* Album Selector */}
                                <TouchableOpacity 
                                    className="flex-row items-center bg-gray-100/80 rounded-md px-2 py-1"
                                    activeOpacity={0.7}
                                >
                                    <Icon name="plus" size={12} color="#4b5563" />
                                    <Text className="text-gray-700 text-[12px] font-semibold mx-1.5">Album</Text>
                                    <Icon name="chevron-down" size={14} color="#4b5563" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Text Input Area */}
                    <View className="px-4 py-2">
                        <TextInput
                            className="text-gray-800 text-[20px] leading-7 font-normal"
                            placeholder="What's on your mind?"
                            placeholderTextColor="#9ca3af"
                            multiline
                            autoFocus
                            value={postText}
                            onChangeText={setPostText}
                            style={{ minHeight: selectedImage ? 80 : 150, textAlignVertical: 'top' }}
                            scrollEnabled={false}
                        />
                    </View>

                    {/* Selected Image Preview */}
                    {selectedImage && (
                        <View className="mx-4 mb-6 rounded-xl overflow-hidden relative border border-gray-200 bg-white">
                            <Image 
                                source={{ uri: selectedImage }} 
                                style={{ width: '100%', height: width * 1.1 }} 
                                resizeMode="cover" 
                            />
                            <TouchableOpacity 
                                className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full items-center justify-center backdrop-blur-md"
                                onPress={() => setSelectedImage(null)}
                                activeOpacity={0.8}
                            >
                                <Icon name="x" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Menu List - Premium Floating Card Style */}
                <View className="px-4 pb-6 pt-2 bg-transparent">
                    <View className="bg-white/90 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <View className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex-row justify-center items-center">
                            <View className="w-10 h-1 bg-gray-300 rounded-full" />
                        </View>
                        
                        {/* Options List */}
                        <View className="p-1">
                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3 bg-white rounded-xl mb-0.5"
                                activeOpacity={0.7}
                                onPress={handleAddPhoto}
                            >
                                <View className="w-8 h-8 items-center justify-center">
                                    <MaterialIcon name="photo-library" size={26} color="#10b981" />
                                </View>
                                <Text className="text-gray-800 text-[15px] font-semibold ml-3">Photo/video</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3 bg-white rounded-xl mb-0.5"
                                activeOpacity={0.7}
                            >
                                <View className="w-8 h-8 items-center justify-center">
                                    <MaterialIcon name="person-add-alt-1" size={26} color="#3b82f6" />
                                </View>
                                <Text className="text-gray-800 text-[15px] font-semibold ml-3">Tag people</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3 bg-white rounded-xl mb-0.5"
                                activeOpacity={0.7}
                            >
                                <View className="w-8 h-8 items-center justify-center">
                                    <MaterialIcon name="emoji-emotions" size={26} color="#f59e0b" />
                                </View>
                                <Text className="text-gray-800 text-[15px] font-semibold ml-3">Feeling/activity</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3 bg-white rounded-xl"
                                activeOpacity={0.7}
                            >
                                <View className="w-8 h-8 items-center justify-center">
                                    <MaterialIcon name="location-on" size={26} color="#ef4444" />
                                </View>
                                <Text className="text-gray-800 text-[15px] font-semibold ml-3">Check in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
