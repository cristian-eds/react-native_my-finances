import { SQLiteDatabase } from "expo-sqlite"
import { DuplicateModel } from "../domain/duplicateModel"
import { create } from "zustand"
import * as duplicateService from '../services/duplicateService'

type Store = {
    duplicates: DuplicateModel[]

    addDuplicate: (duplicate: Omit<DuplicateModel, "id">, userId: number, database: SQLiteDatabase) => Promise<boolean>
    fetchDuplicates: (userId: number, database: SQLiteDatabase) => void
    updateDuplicate: (duplicate: DuplicateModel, database: SQLiteDatabase) => Promise<boolean>
    deleteDuplicate: (duplicateId: number, database: SQLiteDatabase) => Promise<boolean>
}

export const useDuplicateStore = create<Store>((set, get) => ({
    duplicates: [],
    addDuplicate: async (duplicate, userId, database) => {
        try {
            const idInserted = await duplicateService.createDuplicate(duplicate, userId, database);
            if (!idInserted) return false;
            set({
                duplicates: [...get().duplicates, { ...duplicate, id: idInserted }]
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
    },
    updateDuplicate: async (duplicate, database) => {
        try {
            const isUpdated = await duplicateService.updateDuplicate(duplicate, database);
            if (isUpdated) {
                set({
                    duplicates: [...get().duplicates.map((current) => current.id === duplicate.id ? duplicate : current)]
                })
            }

            return isUpdated;

        } catch (error) {
            console.error("Error updating duplicate",error)
            return false;
        }
    },
    deleteDuplicate: async (duplicateId, database) => {
        try {
            const isDeleted = await duplicateService.deleteDuplicate(duplicateId, database);
            if(isDeleted) {
                set({
                    duplicates: [...get().duplicates.filter((current) => current.id !== duplicateId )]
                })
            }
            return isDeleted;
        } catch (error) {
            console.error("Error deleting duplicate",error)
            return false;
        }
    }
}))