import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";
import { CategoryRecord } from "./records/CategoryRecord";


export async function create(userId: string, category: Omit<CategoryModel, 'id'>, database: SQLiteDatabase): Promise<number | undefined> {
    try {
        const result = await database.runAsync(` 
            INSERT INTO categories (user_id, movement_type, hex_color, icon_name, description)
            VALUES (?, ?, ?, ?, ?);
        `,[userId,category.movementType, category.hexColor, category.iconName, category.description]);

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating session:", error);
    } 
}

export async function getAll(userId: string, database: SQLiteDatabase): Promise<CategoryRecord[] | undefined> {
    const statement = await database.prepareAsync(`
            SELECT * FROM categories 
            WHERE user_id = $userId
    `);

    try {
        const params = {
            $userId: userId
        }

        const result = await statement.executeAsync<CategoryRecord>(params);
        const categories = await result.getAllAsync();

        if(categories) return categories;

    } catch (error) {
        console.error('Error getting all categories', error);
    } finally {
        statement.finalizeAsync();
    }
}