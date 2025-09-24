import { SQLiteDatabase } from "expo-sqlite";

import * as userRepository from "../repository/userRepository";

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

    return { data: savedUser }; 
}


export { createUser };