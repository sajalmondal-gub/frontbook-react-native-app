import { View, TextInput, Text, TouchableOpacity, Image, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useContext, useState } from "react";
import { login as loginService } from "../../services/authService";
import { AuthContext } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const { login } = useContext(AuthContext);
    const navigation = useNavigation<any>();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        const user = await loginService(username, password);

        if (user) {
            login(user);
        } else {
            console.log("Invalid credentials");
        }
    };

    return (
        <LinearGradient
            colors={['#fff7ed', '#faf5ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1">
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 32, // Equivalent to px-8
                        paddingVertical: 40    // Equivalent to py-10
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={Platform.OS === 'android' ? 20 : 0}
                >
                    <View className="items-center mb-10">
                            <Image
                                source={require("../../assets/images/logo.png")}
                                className="w-24 h-24 mb-6 rounded-3xl"
                                resizeMode="contain"
                            />

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

                            <Text className="text-gray-600 text-center mt-3 text-sm tracking-wide font-medium px-4">
                                Welcome back to FrontBook!
                            </Text>
                        </View>

                        {/* Premium Input Fields */}
                        <View className="gap-y-6">
                            <View>
                                <Text className="text-gray-500 font-bold text-[11px] mb-2 ml-1 tracking-widest uppercase">Username</Text>
                                <View className="flex-row items-center w-full bg-white rounded-2xl border border-primary-200 px-4 shadow-sm">
                                    <Icon name="user" size={20} color="#f97316" style={{ marginRight: 8 }} />
                                    <TextInput
                                        placeholder="Enter your username"
                                        placeholderTextColor="#9ca3af"
                                        onChangeText={setUsername}
                                        className="flex-1 text-gray-900 py-4 font-medium text-base"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="text-gray-500 font-bold text-[11px] mb-2 ml-1 tracking-widest uppercase">Password</Text>
                                <View className="flex-row items-center w-full bg-white rounded-2xl border border-secondary-200 px-4 shadow-sm">
                                    <Icon name="lock" size={20} color="#a855f7" style={{ marginRight: 8 }} />
                                    <TextInput
                                        placeholder="Enter your password"
                                        placeholderTextColor="#9ca3af"
                                        secureTextEntry={!showPassword}
                                        onChangeText={setPassword}
                                        className="flex-1 text-gray-900 py-4 font-medium text-base"
                                    />
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-2">
                                        <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#a855f7" />
                                    </TouchableOpacity>
                                </View>
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
                            <Text className="text-gray-600 text-sm">Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className="text-primary-500 font-bold text-sm">Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}