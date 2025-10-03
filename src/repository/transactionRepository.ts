import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "./records/TransactionRecord";

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

export async function getAllByAccount(accountId: number, database: SQLiteDatabase): Promise<TransactionRecord[] | undefined> {
    const statement = await database.prepareAsync(`
            SELECT * FROM transactions 
            WHERE transactions.account_id = $accountId;
    `);

    try {
        const params = {
            $accountId: accountId
        };

        const result = await statement.executeAsync<TransactionRecord>(params);
        const transactions = await result.getAllAsync();
        if(transactions) {
            return transactions;
        }
    } catch (error) {
        console.error("Error fetching transactions", error);
    } finally {
        statement.finalizeAsync();
    }

}