import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../hooks/useAuth';
import { users } from '../data/users';

export default function Stories() {
    const { user } = useAuth();

    // Filter out the logged-in user from the mock users list
    const otherUsers = users.filter(u => u.username !== user?.username);

    return (
        <View className="bg-transparent py-4 border-b border-gray-200/40">
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {/* Create Story Card (Active User) */}
                <TouchableOpacity 
                    className="w-28 h-44 rounded-2xl bg-white shadow-sm mr-3 overflow-hidden border border-gray-100"
                    activeOpacity={0.8}
                    onPress={() => console.log('Create Story clicked')}
                >
                    <Image 
                        source={user?.profileImage || require('../assets/images/logo.png')}
                        className="w-full h-[65%]"
                        resizeMode="cover"
                    />
                    
                    <View className="w-full h-[35%] bg-white items-center justify-end pb-3">
                        <Text className="text-[12px] font-bold text-gray-800">
                            Create Story
                        </Text>
                    </View>

                    {/* Overlapping Plus Icon */}
                    <View className="absolute top-[56%] left-0 right-0 flex-row justify-center z-10">
                        <View className="w-9 h-9 rounded-full bg-[#f97316] border-4 border-white items-center justify-center">
                            <Icon name="plus" size={18} color="#ffffff" />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Other Users' Stories */}
                {otherUsers.map((u, index) => (
                    <TouchableOpacity 
                        key={u.id}
                        className="w-28 h-44 rounded-2xl shadow-sm mr-3 overflow-hidden border border-gray-200/50"
                        activeOpacity={0.8}
                    >
                        {/* Background Cover Image */}
                        <Image 
                            source={u.coverImage || u.profileImage}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        
                        {/* Dark Overlay Gradient simulation */}
                        <View className="absolute inset-0 bg-black/10" />

                        {/* Top Left Profile Image */}
                        <View className="absolute top-3 left-3 w-10 h-10 rounded-full border-2 border-[#f97316] overflow-hidden bg-white">
                            <Image 
                                source={u.profileImage}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>

                        {/* Bottom Name Text */}
                        <View className="absolute bottom-3 left-3 right-2">
                            <Text 
                                className="text-white text-[12px] font-bold drop-shadow-lg shadow-black"
                                numberOfLines={2}
                            >
                                {u.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
