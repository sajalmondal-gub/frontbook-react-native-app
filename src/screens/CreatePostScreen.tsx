import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Platform, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

    const isPostEnabled = postText.trim().length > 0 || selectedImage;

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            
            {/* Header */}
            <View 
                className="flex-row items-center justify-between px-4 pb-3 bg-white border-b border-gray-100 z-10"
                style={{ paddingTop: insets.top ? insets.top + 10 : 20 }}
            >
                <View className="flex-row items-center">
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        className="p-2 -ml-2 rounded-full active:bg-gray-100"
                        activeOpacity={0.7}
                    >
                        <Icon name="x" size={24} color="#1f2937" />
                    </TouchableOpacity>
                    <Text className="text-gray-900 font-bold text-[18px] ml-3">Create Post</Text>
                </View>
                
                <TouchableOpacity 
                    onPress={handlePost} 
                    disabled={!isPostEnabled}
                    activeOpacity={0.8}
                    className={`px-5 py-1.5 rounded-full ${isPostEnabled ? 'bg-blue-600' : 'bg-gray-100'}`}
                >
                    <Text className={`font-semibold text-[15px] ${isPostEnabled ? 'text-white' : 'text-gray-400'}`}>
                        Post
                    </Text>
                </TouchableOpacity>
            </View>

            <KeyboardAwareScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                bounces={true} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
            >
                {/* User Info & Privacy */}
                <View className="flex-row px-4 py-4 items-center">
                    <Image
                        source={user?.profileImage || require('../assets/images/logo.png')}
                        className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200"
                        resizeMode="cover"
                    />

                    <View className="ml-3 justify-center">
                        <Text className="text-gray-900 font-bold text-[16px] mb-1">
                            {user?.name || 'Sajal Mondal'}
                        </Text>
                        
                        <View className="flex-row items-center">
                            {/* Privacy Selector */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-blue-50 border border-blue-100 rounded-md px-2.5 py-1 mr-2"
                                activeOpacity={0.7}
                            >
                                <Icon name="users" size={12} color="#2563eb" />
                                <Text className="text-blue-700 text-[12px] font-semibold mx-1.5">Friends</Text>
                                <Icon name="chevron-down" size={14} color="#2563eb" />
                            </TouchableOpacity>

                            {/* Album Selector */}
                            <TouchableOpacity 
                                className="flex-row items-center bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1"
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
                <View className="px-4 py-2 flex-1 min-h-[150px]">
                    <TextInput
                        className={`text-gray-800 ${postText.length < 50 && !selectedImage ? 'text-[24px] leading-8' : 'text-[18px] leading-6'} font-normal`}
                        placeholder="What do you want to talk about?"
                        placeholderTextColor="#9ca3af"
                        multiline
                        autoFocus
                        value={postText}
                        onChangeText={setPostText}
                        style={{ textAlignVertical: 'top' }}
                        scrollEnabled={false}
                    />
                </View>

                {/* Selected Image Preview */}
                {selectedImage && (
                    <View className="mx-4 mt-2 mb-4 rounded-2xl overflow-hidden relative border border-gray-200 bg-gray-50 shadow-sm">
                        <Image 
                            source={{ uri: selectedImage }} 
                            style={{ width: '100%', height: width * 1.1 }} 
                            resizeMode="cover" 
                        />
                        <TouchableOpacity 
                            className="absolute top-3 right-3 w-9 h-9 bg-black/60 rounded-full items-center justify-center"
                            onPress={() => setSelectedImage(null)}
                            activeOpacity={0.8}
                        >
                            <Icon name="x" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAwareScrollView>

            {/* Bottom Actions Bar */}
            <View className="px-4 py-3 bg-white border-t border-gray-100 flex-row items-center">
                <TouchableOpacity 
                    className="p-2 mr-2 rounded-full bg-green-50 active:bg-green-100"
                    activeOpacity={0.7}
                    onPress={handleAddPhoto}
                >
                    <MaterialIcon name="photo-library" size={24} color="#10b981" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className="p-2 mr-2 rounded-full bg-blue-50 active:bg-blue-100"
                    activeOpacity={0.7}
                >
                    <MaterialIcon name="person-add-alt-1" size={24} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className="p-2 mr-2 rounded-full bg-yellow-50 active:bg-yellow-100"
                    activeOpacity={0.7}
                >
                    <MaterialIcon name="emoji-emotions" size={24} color="#f59e0b" />
                </TouchableOpacity>
                <TouchableOpacity 
                    className="p-2 rounded-full bg-red-50 active:bg-red-100"
                    activeOpacity={0.7}
                >
                    <MaterialIcon name="location-on" size={24} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
