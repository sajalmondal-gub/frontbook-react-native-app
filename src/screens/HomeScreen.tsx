import { View, StatusBar, FlatList } from "react-native";
import HomeHeader from "../components/HomeHeader";
import CreatePost from "../components/CreatePost";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import LinearGradient from 'react-native-linear-gradient';
import { posts } from "../data/posts";

export default function HomeScreen() {
    return (
        <LinearGradient
            colors={['#f3f4f6', '#f3f4f6']} // Changed back to gray-100 to match classic FB feed background
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <HomeHeader />
            
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={
                    <>
                        <CreatePost />
                        <Stories />
                    </>
                }
            />
        </LinearGradient>
    );
}