import { SQLiteDatabase } from "expo-sqlite";
import { ParameterModel } from "../domain/paremetersModel";
import { ParametersRecord } from "./records/ParametersRecord";
import { getHoursMinutesFromDate } from "../utils/DateFormater";


export async function create(parameter: Omit<ParameterModel, "id">, database: SQLiteDatabase): Promise<number | undefined> {
    try {
        const result = await database.runAsync(` 
            INSERT INTO parameters (
                user_id, 
                enable_transaction_notify, 
                enable_duplicate_notify, 
                enable_show_balance, 
                duplicate_notification_time,
                default_active_account_id,
                transaction_default_account_id,
                transaction_default_category_exit_id,
                transaction_default_category_entry_id,
                transaction_default_category_transfer_id
            )
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
            [
                parameter.userId,
                1,
                1,
                1,
                '08:00',
                null,
                null,
                null,
                null,
                null
            ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating parameter:", error);
    }
}

export async function getByUser(userId: number, database: SQLiteDatabase): Promise<ParametersRecord | undefined> {
    try {
        const result = await database.getAllAsync<ParametersRecord>(`
            SELECT *
            FROM parameters
            WHERE user_id = ?;
        `, [userId]);

        return result.length > 0 ? result[0] : undefined;
    } catch (error) {
        console.error("Error fetching parameters by user:", error);
        return undefined;
    }
}

export async function update(parameter: ParameterModel, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(`
            UPDATE parameters
            SET enable_transaction_notify = ?,
                enable_duplicate_notify = ?,
                enable_show_balance = ?,
                duplicate_notification_time = ?,
                default_active_account_id = ?,
                transaction_default_account_id = ?,
                transaction_default_category_exit_id = ?,
                transaction_default_category_entry_id = ?,
                transaction_default_category_transfer_id = ?
            WHERE user_id = ?;
        `,
            [
                parameter.enableTransactionNotify ?? 1,
                parameter.enableDuplicateNotify ?? 1,
                parameter.enableShowBalance ?? 1,
                parameter.duplicateNotificationTime ? getHoursMinutesFromDate(parameter.duplicateNotificationTime) : '08:00',
                parameter.defaultActiveAccountId ?? null,
                parameter.transactionDefaultAccountId ?? null,
                parameter.transactionDefaultCategoryExitId ?? null,
                parameter.transactionDefaultCategoryEntryId ?? null,
                parameter.transactionDefaultCategoryTransferId ?? null,
                parameter.userId
            ]);
        return res.changes > 0;
    } catch (error) {
        console.error("Error updating parameter:", error);
        return false;
    }
}