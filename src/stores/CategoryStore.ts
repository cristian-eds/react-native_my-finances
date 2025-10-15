import { create } from "zustand";
import { CategoryModel } from "../domain/categoryModel"

import * as categoryService from '../services/categoryService';
import { SQLiteDatabase } from "expo-sqlite";


type Store = {
    categories: CategoryModel[];

    fetchCategories: () => Promise<boolean>;
    createCategory: (userId: number,category: Omit<CategoryModel, 'id'>, database: SQLiteDatabase) => Promise<boolean>;
}


export const useCategoryStore = create<Store>((set, get) => ({

    categories: [],

    fetchCategories: async () => {
        return true;
    },

    createCategory: async (userId,category, database) => {
        const insertedId = await categoryService.createCategory(userId,category,database);
        if (!insertedId) return false;

        set({
            categories: [...get().categories, { ...category, id: insertedId }]
        })
        return true;
    }
}))