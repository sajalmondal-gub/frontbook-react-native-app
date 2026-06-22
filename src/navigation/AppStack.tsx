import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        </Stack.Navigator>
    );
}