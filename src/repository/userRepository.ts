import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../domain/userModel";
import bcrypt from "react-native-bcrypt";

async function create(data: Omit<User,"id">, database: SQLiteDatabase): Promise<User | undefined> {

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

        return {id: Number(insertId), ...data};
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

async function findUserByCpf(cpf: string, database: SQLiteDatabase): Promise<User | undefined>  {
    const statement = (` 
            SELECT * FROM users WHERE cpf = $cpf;
        `);
    try {
        const params = { $cpf: cpf };
        const user = await database.getFirstAsync<User>(statement,params);
        if (user) {
            return user;
        }
    } catch (error) {
        console.error("Error getting user:", error);
        return undefined;
    } 
}

async function findUserBySessionToken(sessionToken: string, database: SQLiteDatabase): Promise<User | undefined>  {
    const statement = await database.prepareAsync(` 
            SELECT * FROM users JOIN sessions on sessions.user_id = users.id WHERE sessions.session_token = $sessionToken;
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