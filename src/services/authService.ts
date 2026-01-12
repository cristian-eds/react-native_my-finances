import { SQLiteDatabase } from "expo-sqlite";
import { ResponseUser } from "../domain/responseUser";
import { UserLogin } from "../domain/userLogin";

import * as userRepository from "../repository/userRepository";
import { generateSessionToken } from "./sessionTokenService";
import { verifyPass } from "./passwordService";
import { getAccountsByUser } from "./accountService";


export async function login(database: SQLiteDatabase, data: UserLogin): Promise<ResponseUser> {

    const user = await userRepository.findUserByCpf(data.cpf, database);

    if (!user) return { data: null, error: "Usuário não encontrado" };

    const hashedPassword = user.password;
    const isMatch = await verifyPass(data.password, hashedPassword);

    if (!isMatch) return { data: null, error: "Senha incorreta" };

    const account = await getAccountsByUser(user.id, database);
    if (account && account?.length > 0) {
        await generateSessionToken(user, database);
    }

    return { data: user };
}

export async function loginWithSessionToken(database: SQLiteDatabase, sessionToken: string): Promise<ResponseUser | undefined> {
    const user = await userRepository.findUserBySessionToken(sessionToken, database);
    if (user) {
        return { data: user };
    }
    return { data: null, error: "Usuário não encontrado" };
}   
