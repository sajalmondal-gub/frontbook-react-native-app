import { View, TextInput, Button, Image } from "react-native";
import { useContext, useState } from "react";
import { login as loginService } from "../../services/authService";
import { AuthContext } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';

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
        <LinearGradient
            colors={['#ff5d053d', '#7e22ce5b', '#ffffff4b', '#03a6f74e']}
            locations={[0, 0.4, 0.65, 1]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            className="justify-center px-6"
        >
            <SafeAreaView className="flex-1 justify-center">
                <View className="h-15 w-15 justify-center items-center">
                    <Image
                        source={require("../../assets/images/logo.png")}
                        className="object-contain"
                    />

                </View>

                <TextInput
                    placeholder="Username"
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <Button title="Login" onPress={handleLogin} />

            </SafeAreaView>
        </LinearGradient>
    );
}