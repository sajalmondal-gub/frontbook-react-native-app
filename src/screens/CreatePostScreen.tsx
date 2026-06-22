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
            >
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
                
                {/* Header */}
                <View 
                    className="flex-row items-center justify-between px-5 py-4 bg-white/80 rounded-b-3xl shadow-sm border-b border-orange-50/50"
                    style={{ paddingTop: insets.top ? insets.top + 10 : 20 }}
                >
                    <View className="flex-row items-center">
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()} 
                            className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center border border-orange-100/50"
                            activeOpacity={0.7}
                        >
                            <Icon name="arrow-left" size={22} color="#1f2937" />
                        </TouchableOpacity>
                        <Text className="text-gray-900 font-extrabold text-[20px] ml-4 tracking-tight">Create Post</Text>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={handlePost} 
                        disabled={postText.trim().length === 0 && !selectedImage}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={(postText.trim().length > 0 || selectedImage) ? ['#f97316', '#a855f7'] : ['#e5e7eb', '#d1d5db']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="px-6 py-2.5 rounded-full shadow-sm"
                        >
                            <Text className={`font-bold text-[15px] ${(postText.trim().length > 0 || selectedImage) ? 'text-white' : 'text-gray-500'}`}>
                                POST
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1" bounces={true} showsVerticalScrollIndicator={false}>
                    {/* User Info & Privacy */}
                    <View className="flex-row px-5 pt-6 pb-2 items-center">
                        <View className="relative shadow-sm">
                            <Image
                                source={user?.profileImage || require('../assets/images/logo.png')}
                                className="w-14 h-14 rounded-full bg-white border-2 border-white"
                                resizeMode="cover"
                            />
                            <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                        </View>

                        <View className="ml-4 justify-center">
                            <Text className="text-gray-900 font-extrabold text-[17px] mb-1.5 tracking-tight">
                                {user?.name || 'Sajal Mondal'}
                            </Text>
                            
                            <View className="flex-row items-center">
                                {/* Privacy Selector */}
                                <TouchableOpacity 
                                    className="flex-row items-center bg-white border border-purple-100 shadow-sm rounded-full px-3 py-1 mr-2"
                                    activeOpacity={0.7}
                                >
                                    <Icon name="users" size={12} color="#a855f7" />
                                    <Text className="text-purple-700 text-[13px] font-bold mx-1.5">Friends</Text>
                                    <Icon name="chevron-down" size={14} color="#a855f7" />
                                </TouchableOpacity>

                                {/* Album Selector */}
                                <TouchableOpacity 
                                    className="flex-row items-center bg-white border border-orange-100 shadow-sm rounded-full px-3 py-1"
                                    activeOpacity={0.7}
                                >
                                    <Icon name="image" size={12} color="#f97316" />
                                    <Text className="text-orange-600 text-[13px] font-bold mx-1.5">Album</Text>
                                    <Icon name="chevron-down" size={14} color="#f97316" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Text Input Area */}
                    <View className="px-5 py-4">
                        <TextInput
                            className="text-gray-800 text-[24px] leading-9 font-medium"
                            placeholder="What's on your mind today?"
                            placeholderTextColor="#9ca3af"
                            multiline
                            autoFocus
                            value={postText}
                            onChangeText={setPostText}
                            style={{ minHeight: selectedImage ? 80 : 180, textAlignVertical: 'top' }}
                        />
                    </View>

                    {/* Selected Image Preview */}
                    {selectedImage && (
                        <View className="mx-5 mb-6 rounded-3xl overflow-hidden relative shadow-md bg-white border-4 border-white">
                            <Image 
                                source={{ uri: selectedImage }} 
                                style={{ width: '100%', height: width * 1.1 }} 
                                resizeMode="cover" 
                            />
                            <TouchableOpacity 
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full items-center justify-center backdrop-blur-md border border-white/20"
                                onPress={() => setSelectedImage(null)}
                                activeOpacity={0.8}
                            >
                                <Icon name="x" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Menu List - Premium Floating Card Style */}
                <View className="px-4 pb-6 pt-2 bg-transparent">
                    <View className="bg-white/90 rounded-3xl shadow-lg border border-white overflow-hidden">
                        <View className="px-5 py-3 bg-gray-50/50 border-b border-gray-100 flex-row justify-center items-center">
                            <View className="w-12 h-1 bg-gray-200 rounded-full" />
                        </View>
                        
                        {/* Options List */}
                        <View className="p-2">
                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3.5 bg-green-50/50 rounded-2xl mb-1"
                                activeOpacity={0.7}
                                onPress={handleAddPhoto}
                            >
                                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                                    <MaterialIcon name="photo-library" size={22} color="#10b981" />
                                </View>
                                <Text className="text-gray-800 text-[16px] font-bold ml-4">Photo/video</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3.5 bg-blue-50/50 rounded-2xl mb-1"
                                activeOpacity={0.7}
                            >
                                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                                    <MaterialIcon name="person-add-alt-1" size={22} color="#3b82f6" />
                                </View>
                                <Text className="text-gray-800 text-[16px] font-bold ml-4">Tag people</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3.5 bg-orange-50/50 rounded-2xl mb-1"
                                activeOpacity={0.7}
                            >
                                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center">
                                    <MaterialIcon name="emoji-emotions" size={22} color="#f97316" />
                                </View>
                                <Text className="text-gray-800 text-[16px] font-bold ml-4">Feeling/activity</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                className="flex-row items-center px-4 py-3.5 bg-red-50/50 rounded-2xl"
                                activeOpacity={0.7}
                            >
                                <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                                    <MaterialIcon name="location-on" size={22} color="#ef4444" />
                                </View>
                                <Text className="text-gray-800 text-[16px] font-bold ml-4">Check in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
