import { View, Text, StatusBar } from "react-native";
import HomeHeader from "../components/HomeHeader";
import CreatePost from "../components/CreatePost";
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={['#fff7ed', '#faf5ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <HomeHeader />
            <CreatePost />
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg font-semibold text-slate-700">HomeScreen Feed Content Here</Text>
            </View>
        </LinearGradient>
    );
}