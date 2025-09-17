import { SQLiteDatabase } from "expo-sqlite";

interface User {
  id?: number;
  name: string;
  cpf: string;
  password: string;
}


async function create(database: SQLiteDatabase, data: User): Promise<User | undefined> {

    try {
        const statement = await database.prepareAsync(` 
            INSERT INTO users (name, cpf, password)
            VALUES ($name, $cpf, $password);
        `);
        const params = {$name: data.name, $cpf: data.cpf, $password: data.password};

        const result = await statement.executeAsync(params);
        const insertId = result.lastInsertRowId.toLocaleString(); 

        return { id: Number(insertId), ...data };
    } catch (error) {
        console.error("Error creating user:", error);
    } finally {
        await database.closeAsync();
    }
}





export { create };