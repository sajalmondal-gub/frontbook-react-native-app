import { View, StatusBar } from "react-native";
import HomeHeader from "../components/HomeHeader";
import CreatePost from "../components/CreatePost";
import Stories from "../components/Stories";
import PostCard from "../components/PostCard";
import LinearGradient from 'react-native-linear-gradient';
import { posts } from "../data/posts";
import Animated, { useAnimatedScrollHandler, useSharedValue, withTiming } from 'react-native-reanimated';
import { useScrollContext } from '../contexts/ScrollContext';

export default function HomeScreen() {
    const { tabBarTranslateY } = useScrollContext();
    const lastContentOffset = useSharedValue(0);
    const isScrolling = useSharedValue(false);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (lastContentOffset.value > event.contentOffset.y && isScrolling.value) {
                // Scrolling up -> show tab bar
                tabBarTranslateY.value = withTiming(0, { duration: 300 });
            } else if (lastContentOffset.value < event.contentOffset.y && isScrolling.value && event.contentOffset.y > 0) {
                // Scrolling down -> hide tab bar
                tabBarTranslateY.value = withTiming(100, { duration: 300 }); // 100 translates it out of view
            }
            lastContentOffset.value = event.contentOffset.y;
        },
        onBeginDrag: () => {
            isScrolling.value = true;
        },
        onEndDrag: () => {
            isScrolling.value = false;
        },
    });

    return (
        <LinearGradient
            colors={['#f3f4f6', '#f3f4f6']} // Changed back to gray-100 to match classic FB feed background
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <HomeHeader />
            
            <Animated.FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }} // padding for tab bar
                onScroll={scrollHandler}
                scrollEventThrottle={16}
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