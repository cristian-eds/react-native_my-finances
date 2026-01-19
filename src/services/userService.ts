import { SQLiteDatabase } from "expo-sqlite";

import * as userRepository from "../repository/userRepository";
import { createInitialCategories } from "./migrationsService";
import { create as createParameter } from "../repository/parameterRepository";

import { User } from "../domain/userModel";
import { ResponseUser } from "../domain/responseUser";
import { hashPassword, verifyPass } from "./passwordService";
import { deleteSession } from "./sessionTokenService";
import { deleteTransactionsByUserId } from "./transactionService";
import { deleteDuplicatesByUserId } from "./duplicateService";
import { deleteCategoriesByUserId } from "./categoryService";
import { deleteAccountsByUserId } from "./accountService";
import { deleteParametersByUserId } from "./parameterService";

async function createUser(data: Omit<User, "id">, database: SQLiteDatabase): Promise<ResponseUser> {

    const userFound = await userRepository.findUserByCpf(data.cpf, database);
    if (userFound) {
        return { data: null, error: "Já existe um usuário com esse CPF" };
    }

    const passwordHased = await hashPassword(data.password);
    if (!passwordHased) return { data: null, error: "Erro ao criar usuário" };

    const userToSave = { ...data, password: passwordHased }
    const savedUser = await userRepository.create(userToSave, database);

    if (!savedUser) {
        return { data: null, error: "Erro ao criar usuário" };
    }

    await createInitialCategories(savedUser.id, database);
    await createParameter({ userId: savedUser.id }, database);

    return { data: savedUser };
}

async function updatePassword(oldPass: string, newPass: string, userId: number, database: SQLiteDatabase): Promise<boolean> {
    const userFound = await userRepository.findUserById(userId.toLocaleString(), database);

    if (!userFound) return false;
    if (await verifyPass(oldPass, userFound.password)) return false;

    return await userRepository.updatePassword(newPass, userId.toLocaleString(), database);
}

async function updateUser(user: Omit<User, 'password'>, database: SQLiteDatabase): Promise<boolean> {
    let userFound = await userRepository.findUserById(user.id.toLocaleString(), database);
    if (!userFound) return false;
    userFound = { ...userFound, ...user };

    return await userRepository.updateUser(userFound, database);
}

async function getUserByCpf(cpf: string, database: SQLiteDatabase): Promise<User | undefined> {
    return await userRepository.findUserByCpf(cpf, database);
}

async function resetPassword(newPass: string, userId: number, database: SQLiteDatabase): Promise<boolean> {
    const passwordHased = await hashPassword(newPass);
    if (!passwordHased) return false;
    return await userRepository.updatePassword(passwordHased, userId.toLocaleString(), database);
}

async function deleteUserCascade(userId: number, database: SQLiteDatabase) {
    let userFound = await userRepository.findUserById(userId.toLocaleString(), database);
    if (!userFound) return false;
    return await userRepository.deleteUser(userId.toLocaleString(), database);
}


export { createUser, updatePassword, updateUser, getUserByCpf, resetPassword, deleteUserCascade };