import { SQLiteDatabase } from "expo-sqlite"
import { DuplicateModel } from "../domain/duplicateModel"
import { create } from "zustand"
import * as duplicateService from '../services/duplicateService'

type Store = {
    duplicates: DuplicateModel[]

    addDuplicate: (duplicate: Omit<DuplicateModel, "id">, userId: string, database: SQLiteDatabase) => Promise<boolean>
    fetchDuplicates: (userId: number, database: SQLiteDatabase) => void
}

export const useDuplicateStore = create<Store>((set, get) => ({
    duplicates: [],
    addDuplicate: async (duplicate, userId, database) => {
        try {
            const idInserted = await duplicateService.createDuplicate(duplicate, userId, database);
            if(!idInserted) return false;
            set({
                duplicates: [...get().duplicates, {...duplicate, id: idInserted} ]
            })

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    fetchDuplicates: async (userId, database) => {
        try {
            const duplicates = await duplicateService.getAllByUser(userId, database);
            set({
                duplicates: duplicates
            })
        } catch (error) {
            console.error(error);
        }
    }
}))