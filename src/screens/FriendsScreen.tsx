import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { friendRequests, friendSuggestions, FriendInfo } from '../data/friends';

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();

  const renderFriendRequest = (item: FriendInfo) => (
    <View key={item.id} className="flex-row items-center mb-4 px-4">
      <Image source={item.profileImage} className="w-20 h-20 rounded-full mr-3" />
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-bold text-gray-900">{item.name}</Text>
          <Text className="text-gray-500 text-xs">{item.timeAgo}</Text>
        </View>
        {item.mutualFriends > 0 && (
          <View className="flex-row items-center mb-2">
            <Image source={{ uri: 'https://randomuser.me/api/portraits/women/90.jpg' }} className="w-4 h-4 rounded-full mr-1.5" />
            <Text className="text-gray-500 text-sm">{item.mutualFriends} mutual friends</Text>
          </View>
        )}
        <View className="flex-row">
          <TouchableOpacity className="flex-1 bg-[#f97316] py-2 rounded-md items-center mr-2">
            <Text className="text-white font-semibold">Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-200 py-2 rounded-md items-center">
            <Text className="text-gray-800 font-semibold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSuggestion = (item: FriendInfo) => (
    <View key={item.id} className="flex-row items-center mb-4 px-4">
      <Image source={item.profileImage} className="w-20 h-20 rounded-full mr-3" />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900 mb-1">{item.name}</Text>
        {item.mutualFriends > 0 && (
          <View className="flex-row items-center mb-2">
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/80.jpg' }} className="w-4 h-4 rounded-full mr-1.5" />
            <Text className="text-gray-500 text-sm">{item.mutualFriends} mutual friends</Text>
          </View>
        )}
        <View className="flex-row">
          <TouchableOpacity className="flex-1 bg-[#f97316]/10 py-2 rounded-md items-center border border-[#f97316]/20 mr-2">
            <Text className="text-[#f97316] font-semibold">Add friend</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-200 py-2 rounded-md items-center">
            <Text className="text-gray-800 font-semibold">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" translucent={true} />
      
      {/* Top Header */}
      <View style={{ paddingTop: insets.top ? insets.top + 10 : 12 }} className="bg-[#f3f4f6] px-4 pb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Icon name="menu" size={28} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Friends</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
          <Icon name="search" size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Top Action Pills */}
        <View className="px-4 py-3 flex-row mb-2">
          <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full mr-2">
            <Text className="font-semibold text-gray-800">Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
            <Text className="font-semibold text-gray-800">Your friends</Text>
          </TouchableOpacity>
        </View>

        {/* Friend Requests Section */}
        <View className="py-2 mb-2">
          <View className="px-4 py-3 flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <Text className="text-xl font-bold text-gray-900 mr-3">Friend requests</Text>
              <Text className="text-lg font-bold text-[#f97316]">{friendRequests.length}</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[#f97316] font-semibold text-base">See all</Text>
            </TouchableOpacity>
          </View>
          
          {friendRequests.map(renderFriendRequest)}
        </View>

        {/* People You May Know Section */}
        <View className="py-2">
          <View className="px-4 py-3 flex-row justify-between items-center mb-2">
            <Text className="text-xl font-bold text-gray-900">People you may know</Text>
          </View>
          
          {friendSuggestions.map(renderSuggestion)}
        </View>

      </ScrollView>
    </View>
  );
}
