import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";
import { create } from "../repository/categoryRepository";
import { iconsOptions } from "../utils/IconOptions";
import { hexColorOptions } from "../utils/HexColorOptions";
import { MovementType } from "../domain/enums/movementTypeEnum";


export const createInitialCategories = async (userId: number, database: SQLiteDatabase) => {

    const icon = iconsOptions;
    const colors = hexColorOptions;

    for (let index = 0; index < icon.length; index++) {
        await create(userId.toLocaleString(), {
            description: icon[index].label,
            hexColor: colors[index].value,
            iconName: icon[index].value,
        }, database)
    }
    
}