import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "../domain/transactionModel";

export async function create(transaction: Omit<Transaction, "id">, database: SQLiteDatabase): Promise<number | undefined> {
    const statement = await database.prepareAsync(` 
            INSERT INTO transactions (description, value, payment_date, movement_type,account_id, category_id, duplicate_id)
            VALUES ($description, $value, $paymentDate, $movementType, $accountId, $categoryId, $duplicateId);
        `);

    try {
        const params = {
            $description: transaction.description,
            $value: transaction.value,
            $paymentDate: transaction.paymentDate.toISOString(),
            $accountId: transaction.accountId,
            $categoryId: transaction.categoryId ?? null,
            $duplicateId: transaction.duplicateId ?? null,
            $movementType: transaction.movementType
        };

        const result = await statement.executeAsync<Transaction>(params);

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating transaction:", error);
    } finally {
        await statement.finalizeAsync();
    }
}