import { SQLiteDatabase } from "expo-sqlite";
import { DuplicateModel } from "../domain/duplicateModel";
import { formaterToSqlite } from "../utils/DateFormater";

export async function create(duplicate: Omit<DuplicateModel, "id">, userId: string, database: SQLiteDatabase): Promise<number | undefined> {

    try {
        const result = await database.runAsync(` 
            INSERT INTO duplicates (description, issued_date, due_date, total_value, movement_type, account_id, category_id, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `,
            [
                duplicate.description,
                formaterToSqlite(duplicate.issueDate),
                formaterToSqlite(duplicate.dueDate),
                duplicate.totalValue,
                duplicate.movementType,
                duplicate.accountId,
                duplicate.categoryId,
                userId
            ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating transaction:", error);
    }
}