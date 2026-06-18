import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { reelsData, Reel } from '../data/reels';

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const ReelItem = ({ item, isActive }: { item: Reel, isActive: boolean }) => {
  const insets = useSafeAreaInsets();
  const [isLiked, setIsLiked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <View style={{ height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#000' }}>
      {/* Video Player */}
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={() => setIsPaused(!isPaused)} 
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <Video
          source={{ uri: item.videoUrl.uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          repeat={true}
          paused={!isActive || isPaused}
          ignoreSilentSwitch="ignore"
        />
        
        {/* Play Icon Overlay if manually paused */}
        {isPaused && (
          <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -30 }, { translateY: -30 }], backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 40, padding: 12 }}>
            <Icon name="play" size={36} color="white" style={{ marginLeft: 4 }} />
          </View>
        )}
      </TouchableOpacity>

      {/* Dark gradient overlay for bottom text */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%' }}
        pointerEvents="none"
      />

      {/* Header Overlay */}
      <View style={{ position: 'absolute', top: insets.top + 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
        {/* Left: Menu & Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon name="menu" size={26} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Reels</Text>
        </View>

        {/* Right: Search & Camera */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity>
            <Icon name="search" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Side Actions */}
      <View style={{ position: 'absolute', right: 12, bottom: 120, alignItems: 'center', gap: 24 }}>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={{ alignItems: 'center' }}>
          <Icon name="heart" size={28} color={isLiked ? '#f97316' : 'white'} style={isLiked ? {} : { opacity: 0.9 }} />
          <Text className="text-white mt-1 text-xs font-semibold">{isLiked ? parseInt(item.likes.replace('K','')) + 1 + 'K' : item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Icon name="message-circle" size={28} color="white" style={{ opacity: 0.9 }} />
          <Text className="text-white mt-1 text-xs font-semibold">{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Icon name="send" size={28} color="white" style={{ opacity: 0.9 }} />
          <Text className="text-white mt-1 text-xs font-semibold">{item.shares}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Icon name="more-horizontal" size={28} color="white" style={{ opacity: 0.9 }} />
        </TouchableOpacity>

        {/* Audio Track Thumbnail */}
        <View className="w-10 h-10 rounded-md border-2 border-white overflow-hidden mt-2">
          <Image source={item.user.profileImage} style={{ width: '100%', height: '100%' }} />
        </View>
      </View>

      {/* Bottom Left Info */}
      <View style={{ position: 'absolute', left: 16, bottom: 90, right: 80 }} pointerEvents="box-none">
        {/* User Info & Follow */}
        <View className="flex-row items-center mb-3">
          <Image 
            source={item.user.profileImage} 
            className="w-10 h-10 rounded-full border border-white/50 mr-3" 
          />
          <Text className="text-white font-bold text-[15px] mr-3 shadow-sm">{item.user.name}</Text>
          <TouchableOpacity className="border border-white/50 px-3 py-1 rounded-md bg-[#f97316]/90">
            <Text className="text-white font-semibold text-xs">Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text className="text-white text-sm mb-3 shadow-sm" numberOfLines={2}>
          {item.description}
        </Text>

        {/* Music Track */}
        <View className="flex-row items-center bg-black/20 self-start px-3 py-1.5 rounded-full">
          <Icon name="music" size={12} color="white" style={{ marginRight: 6 }} />
          <Text className="text-white text-xs">{item.musicTrack}</Text>
        </View>
      </View>
    </View>
  );
};

export default function ReelsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ReelItem item={item} isActive={index === currentIndex} />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / WINDOW_HEIGHT);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
}
