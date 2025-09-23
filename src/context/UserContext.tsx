import React, { createContext, useEffect, useState } from "react";
import { User } from "../domain/userModel";
import { useSQLiteContext } from "expo-sqlite";
import { UserLogin } from "../domain/userLogin";
import { login, loginWithSessionToken } from "../services/authService";
import { ResponseUser } from "../domain/responseUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAccountByUser } from "../services/accountService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/types/RootStackParamList";


interface ContentContext {
    user: Omit<User, 'password'> | null,
    loginUser: (data: UserLogin, navigation: StackNavigationProp<RootStackParamList>) => Promise<ResponseUser | undefined>,
    logout: () => void,
    verifySessionToken: () => void
}

export const UserContext = createContext<ContentContext | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {

    const db = useSQLiteContext();

    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);

    const loginUser = async (data: UserLogin, navigation: StackNavigationProp<RootStackParamList>): Promise<ResponseUser | undefined> => {
        const response = await login(db, data);
        if (response?.data) {
            const account = await getAccountByUser(response.data.id, db);
            if (account) {
                setUser(response?.data)
            } else {
                navigation.navigate("RegisterInitialAccount", {userId: response.data.id});
            }
        }
        return response;
    }

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("sessionToken");
    }

    const verifySessionToken = async () => {
        const token = await AsyncStorage.getItem("sessionToken");

        if (!token) return;

        const response = await loginWithSessionToken(db, token);

        if (response?.data) {
            setUser(response?.data)
        }
    }

    useEffect(() => {
        verifySessionToken();
    }, [])

    return (
        <UserContext.Provider value={{ user, loginUser, logout, verifySessionToken }}>
            {children}
        </UserContext.Provider>
    );
}
