import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";


export async function create(userId: string, category: Omit<CategoryModel, 'id'>, database: SQLiteDatabase): Promise<number | undefined> {
    try {
        const result = await database.runAsync(` 
            INSERT INTO category (user_id, movement_type, hex_color, icon_name, description)
            VALUES (?, ?, ?, ?, ?);
        `,[userId,category.movementType, category.hexColor, category.iconName, category.description]);

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating session:", error);
    } 
}