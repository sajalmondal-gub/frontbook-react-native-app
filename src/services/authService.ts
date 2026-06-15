import * as Keychain from 'react-native-keychain';
import { users } from '../data/users';

export const login = async (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        await Keychain.setGenericPassword(username, password);
        return user;
    }
    return null;
};

export const register = async (name: string, username: string, email: string, password: string) => {
    const newUser = {
        id: users.length + 1,
        name,
        username,
        email,
        password,
        profileImage: require("../assets/images/user/user_1.png"),
        coverImage: require("../assets/images/user/user_cover_1.jpeg"),
        followers: 0,
        following: 0,
    };
    users.push(newUser);
    await Keychain.setGenericPassword(username, password);
    return newUser;
};

export const logout = async () => {
    await Keychain.resetGenericPassword();
};

export const getCurrentUser = async () => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) return null;
        
        // Match credentials with user array
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
        return user || null;
    } catch (error) {
        console.log("Error getting user from keychain:", error);
        return null;
    }
};