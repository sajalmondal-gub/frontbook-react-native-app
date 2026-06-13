import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";
import { View } from "react-native";
import Loader from "../components/Loader";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function RootNavigator() {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Loader />;
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}