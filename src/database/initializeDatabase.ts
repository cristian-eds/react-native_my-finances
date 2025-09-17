import {type SQLiteDatabase} from "expo-sqlite";

export async function intilizeDatabase(database: SQLiteDatabase) {

    console.log("Initializing database...");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `);
    
}