import { View, TextInput, Button } from "react-native";
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
        <SafeAreaView className="flex-1">
            <LinearGradient
                colors={['#ea580c', '#7e22ce', '#ffffff', '#0284c7']}
                locations={[0, 0.4, 0.65, 1]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                className="flex-1 justify-center px-6"
            >
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
            </LinearGradient>
        </SafeAreaView>
    );
}