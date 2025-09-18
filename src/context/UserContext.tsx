import React, { createContext, useState } from "react";
import { User } from "../domain/userModel";
import { useSQLiteContext } from "expo-sqlite";
import { UserLogin } from "../domain/userLogin";
import { login } from "../services/authService";

interface ContentContext {
    user: Omit<User, 'password'> | null,
    loginUser: (data: UserLogin) => void
}

export const UserContext = createContext<ContentContext | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {

    const db = useSQLiteContext();

    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);  

    const loginUser = async (data: UserLogin) => {
        const response = await login(db, data);
            if(!response?.data) {
              return;
            }
            setUser(response?.data)
    }

    return (
        <UserContext.Provider value={{user, loginUser}}>
            {children}
        </UserContext.Provider>
    );
}
