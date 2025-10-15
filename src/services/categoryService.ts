import { SQLiteDatabase } from "expo-sqlite";
import { CategoryModel } from "../domain/categoryModel";

import * as categoryRepository from '../repository/categoryRepository';
import {toModelList} from '../mappers/categoryMapper'

export const createCategory = async (userId: number,category: Omit<CategoryModel,'id'>, database: SQLiteDatabase) => {
    if(!userId) return false;
    return await categoryRepository.create(userId.toString() ,category, database);
}

export const getAllCategories = async (userId: number,database: SQLiteDatabase) => {
    if(!userId) return;
    const categories = await categoryRepository.getAll(userId.toString(), database);
    if(!categories) return;
    return toModelList(categories);
}