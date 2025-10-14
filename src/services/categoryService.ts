import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";

import * as categoryRepository from '../repository/categoryRepository';

export const createCategory = (userId: number, category: Omit<CategoryModel,'id'> ,database: SQLiteDatabase) => {
    return categoryRepository.create(userId.toString() ,category, database);
}