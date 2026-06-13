import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const Loader = () => {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 0.9,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    })
                ]),
                Animated.sequence([
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0.6,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    })
                ])
            ])
        );

        pulse.start();

        return () => pulse.stop();
    }, [scaleAnim, opacityAnim]);

    return (
        <View className="flex-1 justify-center items-center bg-white dark:bg-slate-900">
            <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }} className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/20">
                <Animated.Image 
                    source={require('../assets/images/logo.png')} 
                    style={{
                        width: 120, 
                        height: 120, 
                    }}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
};

export default Loader;
