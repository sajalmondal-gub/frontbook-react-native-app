import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export interface DropdownOption {
    id: string;
    label: string;
    icon: string;
    onPress: () => void;
}

interface DropdownMenuProps {
    visible: boolean;
    onClose: () => void;
    options: DropdownOption[];
    topOffset?: number;
    rightOffset?: number;
}

export default function DropdownMenu({ 
    visible, 
    onClose, 
    options, 
    topOffset = 60, 
    rightOffset = 20 
}: DropdownMenuProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            {/* Background Overlay */}
            <TouchableOpacity 
                style={styles.overlay} 
                activeOpacity={1} 
                onPress={onClose}
            >
                {/* Dropdown Container */}
                <View 
                    className="bg-white rounded-2xl shadow-xl border border-gray-100"
                    style={[
                        styles.dropdownContainer,
                        { top: topOffset, right: rightOffset }
                    ]}
                >
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={option.id}
                            className={`flex-row items-center px-4 py-3 ${
                                index !== options.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                            onPress={() => {
                                option.onPress();
                                onClose();
                            }}
                            activeOpacity={0.7}
                        >
                            <View className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center mr-3">
                                <Icon name={option.icon} size={16} color="#f97316" />
                            </View>
                            <Text className="text-gray-800 font-semibold text-sm">
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)', // Subtle backdrop
    },
    dropdownContainer: {
        position: 'absolute',
        width: 160,
        minWidth: 160,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    }
});
