import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../domain/userModel";
import bcrypt from 'react-native-bcrypt';

async function create(database: SQLiteDatabase, data: User): Promise<User | undefined> {
    const statement = await database.prepareAsync(` 
            INSERT INTO users (name, cpf, password)
            VALUES ($name, $cpf, $password);
        `);
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHashed = bcrypt.hashSync(data.password, salt);
        
        const params = {$name: data.name, $cpf: data.cpf, $password: passwordHashed};

        const result = await statement.executeAsync(params);
        const insertId = result.lastInsertRowId.toLocaleString(); 

        return { id: Number(insertId), ...data };
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        await statement.finalizeAsync();
    }
}






export { create };