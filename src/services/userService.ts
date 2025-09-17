import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../domain/userModel";
import bcrypt from 'react-native-bcrypt';
import { ResponseUser } from "../domain/responseUser";

async function create(data: User, database: SQLiteDatabase): Promise<ResponseUser | undefined> {

    await getUserByCpf(data.cpf, database).then(response => {
        if(response?.data) {
            return { data: null, error: "CPF já cadastrado" };
        }
    });

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

        return { data : {id: Number(insertId), ...data} };
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
        const params = { $id: cpf };
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