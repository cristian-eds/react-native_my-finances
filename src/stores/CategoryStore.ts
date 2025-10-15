import { create } from "zustand";
import { CategoryModel } from "../domain/categoryModel"

import * as categoryService from '../services/categoryService';
import { SQLiteDatabase } from "expo-sqlite";


type Store = {
    categories: CategoryModel[];

    fetchCategories: (userId: number, database: SQLiteDatabase, search?: string) => Promise<boolean>;
    createCategory: (userId: number,category: Omit<CategoryModel, 'id'>, database: SQLiteDatabase) => Promise<boolean>;
    updateCategory: (category: CategoryModel, database: SQLiteDatabase) => Promise<boolean>;
    deleteCategory: (categoryId: number, database: SQLiteDatabase) => Promise<boolean>
}


export const useCategoryStore = create<Store>((set, get) => ({

    categories: [],

    fetchCategories: async (userId, database, search) => {
        const categories = await categoryService.getAllCategories(userId, database, search);
        if(!categories) return false;

        set({
            categories: [...categories]
        })
        return true;
    },

    createCategory: async (userId,category, database) => {
        const insertedId = await categoryService.createCategory(userId,category,database);
        if (!insertedId) return false;

        set({
            categories: [...get().categories, { ...category, id: insertedId }]
        })
        return true;
    },

    updateCategory : async (category, database) => {
        const updated = await categoryService.updateCategory(category, database);
        if(!updated) return false;

        set({
            categories: [...get().categories.map(categoryState => categoryState.id === category.id ? category: categoryState)]
        })

        return true;
    },

    deleteCategory: async (categoryId, database) => {
        const deleted = await categoryService.deleteCategory(categoryId, database);
        if(!deleted) return false;

        set({
            categories: [...get().categories.filter(categoryState => categoryState.id !== categoryId)]
        })
        return true;
    }
}))