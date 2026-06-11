import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import { ActivityIndicator, View } from "react-native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function RootNavigator() {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}