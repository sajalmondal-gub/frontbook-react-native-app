import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, StyleSheet, BackHandler } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { useDrawer } from '../contexts/DrawerContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

export default function DrawerMenu() {
  const { isOpen, closeDrawer } = useDrawer();
  const translateX = useSharedValue(-width);
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isOpen) {
      translateX.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(0.5, { duration: 300 });
    } else {
      translateX.value = withTiming(-width, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isOpen]);

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        closeDrawer();
        return true;
      }
      return false;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [isOpen]);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const MenuItem = ({ icon, label, color = "#4b5563" }: { icon: string, label: string, color?: string }) => (
    <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-gray-100">
      <View style={{ width: 32 }} className="items-center">
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text className="text-gray-800 text-[17px] font-semibold ml-3">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]} pointerEvents={isOpen ? "auto" : "none"}>
      {/* Dark Overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'black' }, animatedOverlayStyle]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={closeDrawer} activeOpacity={1} />
      </Animated.View>

      {/* Drawer Content */}
      <Animated.View 
        style={[
          { position: 'absolute', top: 0, bottom: 0, left: 0, width: DRAWER_WIDTH, backgroundColor: '#f9fafb', paddingTop: insets.top },
          animatedDrawerStyle
        ]}
      >
        <View className="flex-1">
          {/* Profile Section */}
          <View className="px-5 py-6 bg-white border-b border-gray-200">
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              className="w-16 h-16 rounded-full mb-3 border-2 border-[#f97316]" 
            />
            <Text className="text-2xl font-bold text-gray-900">Sajal Mondal</Text>
            <Text className="text-gray-500 font-medium mt-1">1,245 Friends</Text>
          </View>

          {/* Menu Items */}
          <View className="flex-1 pt-2 bg-white mt-2">
            <MenuItem icon="layout" label="Dashboard" color="#f97316" />
            <MenuItem icon="help-circle" label="Help & Support" color="#a855f7" />
            <MenuItem icon="settings" label="Privacy & Settings" color="#f97316" />
            <MenuItem icon="bookmark" label="Saved" color="#a855f7" />
            <MenuItem icon="users" label="Groups" color="#f97316" />
            <MenuItem icon="calendar" label="Events" color="#a855f7" />
          </View>

          {/* Logout */}
          <TouchableOpacity className="flex-row items-center py-5 px-5 bg-white mt-2 border-t border-gray-200" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
            <View style={{ width: 32 }} className="items-center">
              <Icon name="log-out" size={24} color="#ef4444" />
            </View>
            <Text className="text-red-500 text-[17px] font-bold ml-3">Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
