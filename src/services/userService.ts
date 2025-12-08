import { SQLiteDatabase } from "expo-sqlite";

import * as userRepository from "../repository/userRepository";
import { createInitialCategories } from "./migrationsService";

import { User } from "../domain/userModel";
import { ResponseUser } from "../domain/responseUser";

async function createUser(data: Omit<User, "id">, database: SQLiteDatabase): Promise<ResponseUser> {

    const userFound = await userRepository.findUserByCpf(data.cpf, database);
    if (userFound) {
        return { data: null, error: "Já existe um usuário com esse CPF" };
    }

    const savedUser = await userRepository.create(data, database);

    if( !savedUser ) {
        return { data: null, error: "Erro ao criar usuário" };
    }

    await createInitialCategories(savedUser.id, database);

    return { data: savedUser }; 
}

async function updatePassword(oldPass: string, newPass: string, userId: number, database: SQLiteDatabase): Promise<boolean> {
    const userFound = await userRepository.findUserById(userId.toLocaleString(), database);
    if(!userFound || userFound.password !== oldPass) return false;
    
    return await userRepository.updatePassword(newPass, userId.toLocaleString(), database);
}

async function updateUser(user: Omit<User, 'password'>, database: SQLiteDatabase): Promise<boolean> {
    const userFound = await userRepository.findUserById(user.id.toLocaleString(), database);
    if(!userFound) return false;

    return await userRepository.updateUser(userFound, database);
}


export { createUser,updatePassword };