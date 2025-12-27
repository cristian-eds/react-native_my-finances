import { SQLiteDatabase } from "expo-sqlite";
import { ParameterModel } from "../domain/paremetersModel";
import { ParametersRecord } from "./records/ParametersRecord";


export async function create(parameter: Omit<ParameterModel, "id">, database: SQLiteDatabase): Promise<number | undefined> {
    try {
        const result = await database.runAsync(` 
            INSERT INTO parameters (user_id, enable_transaction_notify, enable_duplicate_notify, duplicate_notification_time)
            VALUES (?, ?, ?, ?);
        `,
            [
               parameter.userId,
               1,
               1,
               '08:00'
            ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating parameter:", error);
    }
}

export async function getByUser(userId: number, database: SQLiteDatabase): Promise<ParametersRecord | undefined> {
    try {
        const result = await database.getAllAsync<ParametersRecord>(`
            SELECT user_id, 
                   enable_transaction_notify, 
                   enable_duplicate_notify, 
                   duplicate_notification_time
            FROM parameters
            WHERE user_id = ?;
        `, [userId]);

        return result.length > 0 ? result[0] : undefined;
    } catch (error) {
        console.error("Error fetching parameters by user:", error);
        return undefined;
    }
}       