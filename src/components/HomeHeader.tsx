import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DropdownMenu, { DropdownOption } from './DropdownMenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeHeader() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const insets = useSafeAreaInsets();

    const menuOptions: DropdownOption[] = [
        { id: 'post', label: 'Post', icon: 'edit-2', onPress: () => console.log('Post clicked') },
        { id: 'story', label: 'Story', icon: 'camera', onPress: () => console.log('Story clicked') },
        { id: 'reel', label: 'Reel', icon: 'video', onPress: () => console.log('Reel clicked') },
        { id: 'live', label: 'Live', icon: 'radio', onPress: () => console.log('Live clicked') },
    ];

    return (
        <View className="flex-row justify-between items-center px-4 py-3 bg-transparent" style={{ paddingTop: insets.top ? insets.top + 10 : 12 }}>
            {/* Left Side: Logo */}
            <View>
                <Image
                    source={require('../assets/images/logo.png')}
                    className="w-10 h-10 rounded-xl"
                    resizeMode="contain"
                />
            </View>

            {/* Right Side: Actions */}
            <View className="flex-row items-center gap-x-2">
                <TouchableOpacity
                    className="w-10 h-10 items-center justify-center"
                    onPress={() => setDropdownVisible(true)}
                    activeOpacity={0.7}
                >
                    <Icon name="plus" size={26} color="#1f2937" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-10 h-10 items-center justify-center"
                    activeOpacity={0.7}
                    onPress={() => console.log('Search clicked')}
                >
                    <Icon name="search" size={24} color="#1f2937" />
                </TouchableOpacity>
            </View>

            <DropdownMenu
                visible={dropdownVisible}
                onClose={() => setDropdownVisible(false)}
                options={menuOptions}
                topOffset={insets.top ? insets.top + 60 : 60}
                rightOffset={20}
            />
        </View>
    );
}
