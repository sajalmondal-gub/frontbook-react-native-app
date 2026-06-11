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

export const logout = async () => {
    await Keychain.resetGenericPassword();
};

export const getCurrentUser = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) return null;
    return JSON.parse(credentials.password);
};