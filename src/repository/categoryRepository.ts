import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";


export async function create(userId: string, category: Omit<CategoryModel,'id'> ,database: SQLiteDatabase): Promise<number| undefined> {

    const statement = await database.prepareAsync(` 
            INSERT INTO categories (user_id, movement_type, hex_color, icon_name)
            VALUES ($userId, $movementType, $hexColor, &iconName);
        `);

    try {
        const params = { 
            $userId: userId, 
            $movementType: category.movementType,
            $hexColor: category.hexColor,
            $iconName: category.iconName
        };
        const result = await statement.executeAsync(params);
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating session:", error);
    } finally {
        await statement.finalizeAsync();
    }
}