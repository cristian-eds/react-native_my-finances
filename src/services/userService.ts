import { SQLiteDatabase } from "expo-sqlite";

import bcrypt from 'react-native-bcrypt';

import { User } from "../domain/userModel";
import { ResponseUser } from "../domain/responseUser";

async function create(data: User, database: SQLiteDatabase): Promise<ResponseUser | undefined> {

    const userFound = await getUserByCpf(data.cpf, database);
    if (userFound) {
        console.log(userFound);
        return { data: null, error: "Já existe um usuário com esse CPF" };
    }

    const statement = await database.prepareAsync(` 
            INSERT INTO users (name, cpf, password)
            VALUES ($name, $cpf, $password);
        `);
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(data.password, salt);

        const params = { $name: data.name, $cpf: data.cpf, $password: passwordHashed };

        const result = await statement.executeAsync(params);
        const insertId = result.lastInsertRowId.toLocaleString();

        return { data: { id: Number(insertId), ...data } };
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

async function getUserByCpf(cpf: string, database: SQLiteDatabase): Promise<ResponseUser | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT * FROM users WHERE cpf = $cpf;
        `);

    try {
        const params = { $cpf: cpf };
        const result = await statement.executeAsync<User>(params);
        const user = await result.getFirstAsync();
        if (user) {
            return { data: user };
        }
        return { data: null, error: "Usuário não encontrado" };
    } catch (error) {
        console.error("Error getting user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}






export { create };