import { SQLiteDatabase } from "expo-sqlite"
import { ParameterModel } from "../domain/paremetersModel"
import { create } from "zustand";
import { getByUser, update } from "../services/parameterService";
import { cancelAllNotifications, rescheduleNotification } from "../services/notificationService";
import { getAllByUserToNotification } from "../services/duplicateService";

type Store = {
    parameters: ParameterModel,

    fetchParametersByUser: (userId: number, database: SQLiteDatabase) => Promise<void>
    updateParameters: (parameter: ParameterModel, database: SQLiteDatabase) => Promise<boolean>
}

export const useParameterStore = create<Store>((set, get) => ({

    parameters: {
        userId: 0,
        enableTransactionNotify: true,
        enableDuplicateNotify: true,
        duplicateNotificationTime: new Date(new Date().setHours(9, 0, 0, 0))
    },

    fetchParametersByUser: async (userId, database) => {
        const paremeters = await getByUser(userId, database);
        if (!paremeters) return;
        set({ parameters: paremeters });
    },

    updateParameters: async (parameter, database) => {
        const updated = await update(parameter, database);
        if (!updated) return false;
        if(!parameter.enableDuplicateNotify) {
            await cancelAllNotifications()
        } else if(parameter.enableDuplicateNotify && !get().parameters.enableDuplicateNotify) {
            const duplicates = await getAllByUserToNotification(parameter.userId, database);
            duplicates.forEach(async duplicate => {
                await rescheduleNotification(duplicate);
            });
        }
        set({ parameters: parameter });
        return true;
    }
}));

