import { View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useContext, useState } from "react";
import { login as loginService } from "../../services/authService";
import { AuthContext } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function LoginScreen() {
    const { login } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const user = await loginService(username, password);

        if (user) {
            login(user);
        } else {
            console.log("Invalid credentials");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#0f0c29]">
            {/* Subtle background glow effect */}
            <View className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
                <LinearGradient
                    colors={['#f9731633', '#0f0c2900']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    className="absolute top-[-10%] left-[-20%] w-[150%] h-[50%] rounded-full"
                />
                <LinearGradient
                    colors={['#a855f733', '#0f0c2900']}
                    start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }}
                    className="absolute bottom-[-10%] right-[-20%] w-[150%] h-[50%] rounded-full"
                />
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center px-8"
            >
                <View className="items-center mb-10">
                    <Image
                        source={require("../../assets/images/logo.png")}
                        className="w-24 h-24 mb-6 rounded-3xl"
                        resizeMode="contain"
                    />
                    
                    {/* Gradient Text for FrontBook */}
                    <MaskedView
                        style={{ height: 50, flexDirection: 'row', width: '100%', justifyContent: 'center' }}
                        maskElement={
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text className="text-4xl font-extrabold text-center tracking-widest bg-transparent">
                                    FrontBook
                                </Text>
                            </View>
                        }
                    >
                        <LinearGradient
                            colors={['#f97316', '#a855f7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1 }}
                        />
                    </MaskedView>

                    <Text className="text-gray-400 text-center mt-3 text-sm tracking-wide font-medium px-4">
                        Welcome back to FrontBook, your premium social platform.
                    </Text>
                </View>

                {/* Premium Input Fields */}
                <View className="gap-y-5">
                    <View>
                        <Text className="text-gray-300 font-semibold text-xs mb-2 ml-1 tracking-wider uppercase">Username</Text>
                        <TextInput
                            placeholder="Enter your username"
                            placeholderTextColor="#6b7280"
                            onChangeText={setUsername}
                            className="w-full bg-white/5 text-white rounded-2xl px-5 py-4 border border-white/10 focus:border-[#a855f7] shadow-sm font-medium"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-300 font-semibold text-xs mb-2 ml-1 tracking-wider uppercase">Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#6b7280"
                            secureTextEntry
                            onChangeText={setPassword}
                            className="w-full bg-white/5 text-white rounded-2xl px-5 py-4 border border-white/10 focus:border-[#a855f7] shadow-sm font-medium"
                        />
                    </View>
                </View>

                {/* Gradient Login Button */}
                <TouchableOpacity onPress={handleLogin} activeOpacity={0.8} className="mt-10">
                    <LinearGradient
                        colors={['#f97316', '#a855f7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="py-4 rounded-2xl items-center justify-center shadow-lg"
                    >
                        <Text className="text-white text-lg font-bold tracking-widest">
                            LOGIN
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View className="mt-8 flex-row justify-center">
                    <Text className="text-gray-400 text-sm">Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text className="text-[#f97316] font-bold text-sm">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}