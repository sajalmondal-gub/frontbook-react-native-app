import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { users } from '../data/users';

interface PostCardProps {
    post: {
        id: number;
        userId: number;
        content: string;
        image?: string;
        likes: number;
        comments: number;
        shares: number;
        createdAt: string;
    };
}

export default function PostCard({ post }: PostCardProps) {
    const author = users.find(u => u.id === post.userId);
    const [isLiked, setIsLiked] = useState(false);

    if (!author) return null;

    return (
        <View className="bg-white my-1 py-3 border-y border-gray-200/50 shadow-sm">
            {/* Header */}
            <View className="flex-row items-center px-4 mb-3">
                <Image 
                    source={author.profileImage}
                    className="w-10 h-10 rounded-full bg-gray-200 border border-gray-100"
                    resizeMode="cover"
                />
                <View className="ml-3 flex-1">
                    <Text className="font-bold text-gray-900 text-[15px]">{author.name}</Text>
                    <View className="flex-row items-center mt-0.5">
                        <Text className="text-gray-500 text-[12px]">{post.createdAt} • </Text>
                        <Icon name="globe" size={10} color="#6b7280" />
                    </View>
                </View>
                <TouchableOpacity className="p-2" activeOpacity={0.7}>
                    <Icon name="more-horizontal" size={20} color="#6b7280" />
                </TouchableOpacity>
            </View>

            {/* Content Text */}
            {post.content && (
                <Text className="px-4 text-gray-800 text-[15px] leading-6 mb-3">
                    {post.content}
                </Text>
            )}

            {/* Content Image */}
            {post.image && (
                <View className="w-full aspect-[4/3] bg-gray-100">
                    <Image 
                        source={{ uri: post.image }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            )}

            {/* Stats (Likes, Comments, Shares) */}
            <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
                <View className="flex-row items-center">
                    <View className="w-5 h-5 rounded-full bg-[#f97316] items-center justify-center border border-white z-10">
                        <Icon name="thumbs-up" size={10} color="#ffffff" />
                    </View>
                    <View className="w-5 h-5 rounded-full bg-[#a855f7] items-center justify-center border border-white -ml-1">
                        <Icon name="heart" size={10} color="#ffffff" />
                    </View>
                    <Text className="text-gray-500 text-[13px] ml-2">
                        {isLiked ? post.likes + 1 : post.likes}
                    </Text>
                </View>
                <View className="flex-row">
                    <Text className="text-gray-500 text-[13px]">{post.comments} comments • </Text>
                    <Text className="text-gray-500 text-[13px]">{post.shares} shares</Text>
                </View>
            </View>

            {/* Actions Footer */}
            <View className="flex-row justify-between items-center px-2 pt-1 mt-1">
                <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center py-2"
                    onPress={() => setIsLiked(!isLiked)}
                    activeOpacity={0.7}
                >
                    <Icon 
                        name="thumbs-up" 
                        size={20} 
                        color={isLiked ? "#f97316" : "#6b7280"} 
                    />
                    <Text className={`ml-2 font-medium text-[14px] ${isLiked ? 'text-[#f97316]' : 'text-gray-500'}`}>
                        Like
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center py-2"
                    activeOpacity={0.7}
                >
                    <Icon name="message-square" size={20} color="#6b7280" />
                    <Text className="ml-2 font-medium text-[14px] text-gray-500">
                        Comment
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className="flex-1 flex-row items-center justify-center py-2"
                    activeOpacity={0.7}
                >
                    <Icon name="share-2" size={20} color="#6b7280" />
                    <Text className="ml-2 font-medium text-[14px] text-gray-500">
                        Share
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
