import { SQLiteDatabase } from "expo-sqlite"
import { ParameterModel } from "../domain/paremetersModel"
import { create } from "zustand";
import { getByUser } from "../services/parameterService";

type Store = {
    parameters?: ParameterModel,

    getParametersByUser: (userId: number, database: SQLiteDatabase) => void
}

export const useParameterStore = create<Store>((set, get) => ({
    getParametersByUser: async (userId, database) => 
        {
            const paremeters = await getByUser(userId, database);
            if(!paremeters) return;
            set({ parameters: paremeters });
        }
}));

