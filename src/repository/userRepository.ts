import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../domain/userModel";

async function create(data: Omit<User, "id">, database: SQLiteDatabase): Promise<User | undefined> {
    try {
        const res = await database.runAsync(` 
            INSERT INTO users (name, cpf, password)
            VALUES (?, ?, ?);
        `,[data.name, data.cpf, data.password])
        //const passwordHashed = await hash(data.password, Number(10));

        const insertId = res.lastInsertRowId.toLocaleString();

        return { id: Number(insertId), ...data };
    } catch (error) {
        console.error("Error creating user:", error);
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

async function findUserById(userId: string, database: SQLiteDatabase): Promise<User | undefined> {
    const statement = (` 
            SELECT * FROM users WHERE id = $id;
        `);
    try {
        const params = { $id: userId };
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

async function updatePassword(newPass: string ,userId: string, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(` 
            UPDATE users 
            SET password = ?
            WHERE id = ?;
        `,[newPass, userId])
        //const passwordHashed = await hash(data.password, Number(10));

        return res.changes > 0;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    } 
}   


export { create, findUserByCpf, findUserBySessionToken, updatePassword, findUserById };