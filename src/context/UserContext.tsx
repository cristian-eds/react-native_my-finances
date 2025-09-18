import React, { createContext, useState } from "react";
import { User } from "../domain/userModel";
import { useSQLiteContext } from "expo-sqlite";
import { UserLogin } from "../domain/userLogin";
import { login } from "../services/authService";
import { ResponseUser } from "../domain/responseUser";

interface ContentContext {
    user: Omit<User, 'password'> | null,
    loginUser: (data: UserLogin) => Promise<ResponseUser | undefined>
}

export const UserContext = createContext<ContentContext | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {

    const db = useSQLiteContext();

    const [user, setUser] = useState<Omit<User, 'password'> | null>(null);  

    const loginUser = async (data: UserLogin) : Promise<ResponseUser | undefined> => {
        const response = await login(db, data);
            if(response?.data) {
              setUser(response?.data)
            }
            return response;
    }

    return (
        <UserContext.Provider value={{user, loginUser}}>
            {children}
        </UserContext.Provider>
    );
}
