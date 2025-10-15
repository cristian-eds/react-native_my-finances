import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";

import * as categoryRepository from '../repository/categoryRepository';

export const createCategory = async (userId: number,category: Omit<CategoryModel,'id'>, database: SQLiteDatabase) => {
    if(!userId) return false;
    return await categoryRepository.create(userId.toString() ,category, database);
}