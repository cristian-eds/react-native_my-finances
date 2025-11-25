import { SQLiteDatabase } from "expo-sqlite";
import { DuplicateModel } from "../domain/duplicateModel";
import { formaterToSqlite } from "../utils/DateFormater";
import { DuplicateRecord } from "./records/DuplicateRecord";
import { DuplicateFiltersModel } from "../domain/duplicatesFilters";

export async function create(duplicate: Omit<DuplicateModel, "id">, userId: string, database: SQLiteDatabase): Promise<number | undefined> {

    try {
        const result = await database.runAsync(` 
            INSERT INTO duplicates (description, issue_date, due_date, total_value, movement_type, account_id, category_id, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `,
            [
                duplicate.description,
                formaterToSqlite(duplicate.issueDate),
                formaterToSqlite(duplicate.dueDate),
                duplicate.totalValue,
                duplicate.movementType,
                duplicate.accountId,
                duplicate.categoryId ?? '',
                userId
            ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating transaction:", error);
    }
}

export async function getAllByUser(userId: string, filters: DuplicateFiltersModel, database: SQLiteDatabase): Promise<DuplicateRecord[] | undefined> {
    let sql = `
        SELECT * FROM duplicates 
        WHERE user_id = $userId
        AND due_date BETWEEN $initialDate AND $finalDate
    `
    if (filters.textSearch) {
        sql += ` AND description LIKE $textSearchQuery`;
    }

    const statement = await database.prepareAsync(sql);

    try {
        const params = { 
            $userId: userId,
            $initialDate: formaterToSqlite(new Date(filters.initialDate.setHours(0, 0, 1))),
            $finalDate: formaterToSqlite(new Date(filters.finalDate.setHours(23, 59, 59))),
        };
        if (filters.textSearch) {
            Object.assign(params, { $textSearchQuery: `%${filters.textSearch}%` });
        }
        const result = await statement.executeAsync<DuplicateRecord>(params);
        const duplicates = await result.getAllAsync();
        return duplicates;
    } catch (error) {
        console.error("Error getting account:", error);
    } finally {
        await statement.finalizeAsync();
    }

}

export async function udpate(duplicate: DuplicateModel, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(`
                UPDATE duplicates
                SET 
                    description = ?,
                    issue_date = ?,
                    due_date = ?,
                    total_value = ?,
                    movement_type = ?,
                    account_id = ?,
                    category_id = ?
                WHERE 
                    id = ?
            `, [
            duplicate.description,
            formaterToSqlite(duplicate.issueDate),
            formaterToSqlite(duplicate.dueDate),
            duplicate.totalValue,
            duplicate.movementType,
            duplicate.accountId,
            duplicate.categoryId ?? '',
            duplicate.id
        ])
        return res.changes > 0;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export async function deleteDuplicate(duplicateId: string, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(`
            DELETE FROM duplicates
            WHERE id = ?; 
            `, duplicateId)
        return res.changes > 0;
    } catch (error) {
        console.error('Error deleting duplicate', error);
        return false;
    }
}