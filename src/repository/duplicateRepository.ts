import { SQLiteDatabase } from "expo-sqlite";
import { DuplicateModel } from "../domain/duplicateModel";
import { formaterToSqlite } from "../utils/DateFormater";
import { DuplicateRecord } from "./records/DuplicateRecord";
import { DuplicateFiltersModel } from "../domain/duplicatesFilters";
import { OrderDuplicate } from "../domain/orderDuplicate";
import { buildInClause } from "../utils/sql/builders";

export async function create(duplicate: Omit<DuplicateModel, "id">, userId: string, database: SQLiteDatabase): Promise<number | undefined> {

    try {
        const result = await database.runAsync(` 
            INSERT INTO duplicates (description, issue_date, due_date, total_value, movement_type, account_id, category_id, user_id, number_installments, duplicate_father_id, notification_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
            [
                duplicate.description,
                formaterToSqlite(duplicate.issueDate),
                formaterToSqlite(duplicate.dueDate),
                duplicate.totalValue,
                duplicate.movementType,
                duplicate.accountId,
                duplicate.categoryId ?? '',
                userId,
                duplicate.numberInstallments,
                duplicate.duplicateFatherId ?? null,
                duplicate.notificationId ?? null
            ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating duplicate:", error);
    }
}

export async function getAllByUser(userId: string, filters: DuplicateFiltersModel, ordenation: OrderDuplicate, database: SQLiteDatabase): Promise<DuplicateRecord[] | undefined> {
    let sql = `
        SELECT * FROM duplicates 
        WHERE user_id = $userId
        AND due_date BETWEEN $initialDate AND $finalDate
    `;

    if (filters.textSearch) {
        sql += ` AND description LIKE $textSearchQuery`;
    }

    const { clause: categoryClause, params: categoryParams } = buildInClause('category_id', filters.categories || [], 'categoryId');

    sql += categoryClause;
    sql += ` ORDER BY DATETIME(${ordenation.orderColumn}) ${ordenation.orderType}; `;

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

        Object.assign(params, categoryParams);

        const result = await statement.executeAsync<DuplicateRecord>(params);
        const duplicates = await result.getAllAsync();
        return duplicates;
    } catch (error) {
        console.error("Error getting duplicates:", error);
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
                    category_id = ?,
                    notification_id = ?
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
            duplicate.notificationId ?? null,
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

export async function udpateFatherId(duplicateId: string, fatherId: string, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(`
                UPDATE duplicates
                SET 
                    duplicate_father_id = ?
                WHERE 
                    id = ?
            `, [
            fatherId,
            duplicateId
        ])
        return res.changes > 0;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export async function getByFatherId(fatherId: string, userId: string, database: SQLiteDatabase): Promise<DuplicateRecord[] | undefined> {
    let sql = `
        SELECT * FROM duplicates 
        WHERE user_id = $userId
        AND duplicate_father_id = $fatherId
    `;

    const statement = await database.prepareAsync(sql);

    try {
        const params = {
            $userId: userId,
            $fatherId: fatherId
        };

        const result = await statement.executeAsync<DuplicateRecord>(params);
        const duplicates = await result.getAllAsync();
        return duplicates;
    } catch (error) {
        console.error("Error getting duplicates:", error);
    } finally {
        await statement.finalizeAsync();
    }

}

export async function updateNotificationId(notification_id: string, duplicateId: string, database: SQLiteDatabase): Promise<boolean> {
    try {
        const res = await database.runAsync(`
                UPDATE duplicates
                SET 
                    notification_id = ?
                WHERE 
                    id = ?
            `, [
            notification_id,
            duplicateId
        ])
        return res.changes > 0;
    } catch (error) {
        console.error(error)
        return false;
    }
}