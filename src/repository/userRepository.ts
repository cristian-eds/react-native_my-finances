import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../domain/userModel";

import { hash } from 'react-native-simple-bcrypt';


async function create(data: Omit<User, "id">, database: SQLiteDatabase): Promise<User | undefined> {

    const statement = await database.prepareAsync(` 
            INSERT INTO users (name, cpf, password)
            VALUES ($name, $cpf, $password);
        `);

    try {
        //const passwordHashed = await hash(data.password, Number(10));
        const params = { $name: data.name, $cpf: data.cpf, $password: data.password };

        const result = await statement.executeAsync(params);
        const insertId = result.lastInsertRowId.toLocaleString();

        return { id: Number(insertId), ...data };
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

async function findUserByCpf(cpf: string, database: SQLiteDatabase): Promise<User | undefined> {
    const statement = (` 
            SELECT * FROM users WHERE cpf = $cpf;
        `);
    try {
        const params = { $cpf: cpf };
        const user = await database.getFirstAsync<User>(statement, params);
        if (user) {
            return user;
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return undefined;
    }
}

async function findUserBySessionToken(sessionToken: string, database: SQLiteDatabase): Promise<User | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT users.id, users.name, users.cpf FROM users JOIN sessions on sessions.user_id = users.id WHERE sessions.session_token = $sessionToken;
        `);
    try {
        const params = { $sessionToken: sessionToken };
        const result = await statement.executeAsync<User>(params);
        const user = await result.getFirstAsync();
        if (user) {
            return user;
        }
    } catch (error) {
        console.error("Error getting user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

export { create, findUserByCpf, findUserBySessionToken };