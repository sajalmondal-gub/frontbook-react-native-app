import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { notificationsData, NotificationItem } from '../data/notifications';

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  const newNotifications = notificationsData.filter(n => n.section === 'New');
  const earlierNotifications = notificationsData.filter(n => n.section === 'Earlier');

  const renderNotification = (item: NotificationItem) => {
    // Determine icon and color based on notification type using project theme colors
    const getIconData = () => {
      switch (item.type) {
        case 'like': return { name: 'heart', color: '#f97316' }; // Orange
        case 'comment': return { name: 'message-circle', color: '#a855f7' }; // Purple
        case 'friend_request': return { name: 'user', color: '#f97316' }; // Orange
        case 'mention': return { name: 'at-sign', color: '#a855f7' }; // Purple
        case 'group': return { name: 'users', color: '#f97316' }; // Orange
        case 'birthday': return { name: 'gift', color: '#f97316' }; // Orange
        default: return { name: 'bell', color: '#f97316' };
      }
    };

    const iconData = getIconData();

    return (
      <TouchableOpacity 
        key={item.id} 
        activeOpacity={0.7}
        className={`flex-row px-4 py-3 mb-0.5 ${item.isUnread ? 'bg-[#fff7ed]' : 'bg-transparent'}`}
      >
        {/* Profile Picture with Action Badge Overlay */}
        <View className="relative mr-3">
          <Image source={item.user.profileImage} className="w-16 h-16 rounded-full" />
          <View 
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full items-center justify-center border-2 border-white"
            style={{ backgroundColor: iconData.color }}
          >
            <Icon name={iconData.name} size={12} color="white" />
          </View>
        </View>

        {/* Notification Content */}
        <View className="flex-1 justify-center">
          <Text className="text-gray-900 text-base leading-5" numberOfLines={3}>
            <Text className="font-bold">{item.user.name}</Text> {item.content}
            {item.target && <Text className="font-bold"> {item.target}</Text>}
          </Text>
          <Text className="text-gray-500 text-[13px] mt-1 font-medium">{item.timeAgo}</Text>

          {/* Friend Request Actions */}
          {item.type === 'friend_request' && (
            <View className="flex-row mt-2.5 pr-4">
              <TouchableOpacity className="flex-1 bg-[#f97316] py-1.5 rounded-md items-center mr-2">
                <Text className="text-white font-semibold text-[14px]">Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-gray-200 py-1.5 rounded-md items-center">
                <Text className="text-gray-800 font-semibold text-[14px]">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* More Options & Unread Dot */}
        <View className="ml-2 items-center justify-between py-1">
          <TouchableOpacity className="p-1">
            <Icon name="more-horizontal" size={24} color="#4b5563" />
          </TouchableOpacity>
          {item.isUnread && (
            <View className="w-3 h-3 rounded-full bg-[#f97316] mb-2" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      {/* Top Header */}
      <View style={{ paddingTop: insets.top ? insets.top + 10 : 12 }} className="bg-[#f3f4f6] px-4 pb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Icon name="menu" size={28} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">Notifications</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center">
          <Icon name="search" size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* New Section */}
        {newNotifications.length > 0 && (
          <View className="mt-2">
            <View className="px-4 py-2 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">New</Text>
            </View>
            {newNotifications.map(renderNotification)}
          </View>
        )}

        {/* Earlier Section */}
        {earlierNotifications.length > 0 && (
          <View className="mt-2">
            <View className="px-4 py-2 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">Earlier</Text>
            </View>
            {earlierNotifications.map(renderNotification)}
          </View>
        )}

      </ScrollView>
    </View>
  );
}
