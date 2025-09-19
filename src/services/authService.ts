import { SQLiteDatabase } from "expo-sqlite";
import bcrypt from "react-native-bcrypt";
import { ResponseUser } from "../domain/responseUser";
import { UserLogin } from "../domain/userLogin";

import * as userRepository from "../repository/userRepository";
import { generateSessionToken } from "./sessionTokenService";

export async function login(database: SQLiteDatabase, data: UserLogin): Promise<ResponseUser | undefined> {

    const user = await userRepository.findUserByCpf(data.cpf, database);
    if (user) {
        const hashedPassword = user.password;

        const isMatch = bcrypt.compareSync(data.password, hashedPassword);

        if (isMatch) {
            await generateSessionToken(user, database);
            return { data: user };
        }
        return { data: null, error: "Senha incorreta" };
    }
    return { data: null, error: "Usuário não encontrado" };
}

export async function loginWithSessionToken(database: SQLiteDatabase, sessionToken: string): Promise<ResponseUser | undefined> {
    const user = await userRepository.findUserBySessionToken(sessionToken, database);
    if(user) {
        return {data: user};
    }
    return { data: null, error: "Usuário não encontrado" };
}   
