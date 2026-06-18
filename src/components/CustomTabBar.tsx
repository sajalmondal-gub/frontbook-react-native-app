import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScrollContext } from '../contexts/ScrollContext';
import { useAuth } from '../hooks/useAuth';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { tabBarTranslateY } = useScrollContext();
  const { user } = useAuth();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tabBarTranslateY.value }],
    };
  });

  return (
    <Animated.View 
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          flexDirection: 'row',
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        animatedStyle
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = '';
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Reels') iconName = 'play-circle'; 
        else if (route.name === 'Friends') iconName = 'users';
        else if (route.name === 'Notifications') iconName = 'bell';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarButtonTestID ? undefined : undefined}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            {route.name === 'Profile' ? (
              <View className={`p-0.5 rounded-full ${isFocused ? 'border-2 border-[#f97316]' : 'border-2 border-transparent'}`}>
                <Image 
                  source={user?.profileImage || require('../assets/images/logo.png')} 
                  style={{ width: 26, height: 26, borderRadius: 13 }}
                />
              </View>
            ) : (
              <Icon 
                name={iconName} 
                size={26} 
                color={isFocused ? '#f97316' : '#65676b'} 
                style={{ 
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
