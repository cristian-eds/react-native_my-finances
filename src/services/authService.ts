import { SQLiteDatabase } from "expo-sqlite";
import { ResponseUser } from "../domain/responseUser";
import { UserLogin } from "../domain/userLogin";

import * as userRepository from "../repository/userRepository";
import { generateSessionToken } from "./sessionTokenService";

import bcrypt from 'react-native-simple-bcrypt';

export async function login(database: SQLiteDatabase, data: UserLogin): Promise<ResponseUser | undefined> {

    const user = await userRepository.findUserByCpf(data.cpf, database);

    if (!user) return { data: null, error: "Usuário não encontrado" };

    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(data.password,hashedPassword);

    if (!isMatch) return { data: null, error: "Senha incorreta" };

    await generateSessionToken(user, database);

    return { data: user };
}

export async function loginWithSessionToken(database: SQLiteDatabase, sessionToken: string): Promise<ResponseUser | undefined> {
    const user = await userRepository.findUserBySessionToken(sessionToken, database);
    if (user) {
        return { data: user };
    }
    return { data: null, error: "Usuário não encontrado" };
}   
