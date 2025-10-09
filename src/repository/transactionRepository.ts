import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "./records/TransactionRecord";
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";
import { formaterIsoDateToDefaultPattern, formaterToSqlite } from "../utils/DateFormater";

export async function create(transaction: Omit<Transaction, "id">, database: SQLiteDatabase): Promise<number | undefined> {
    const statement = await database.prepareAsync(` 
            INSERT INTO transactions (description, value, payment_date, movement_type,account_id, category_id, duplicate_id)
            VALUES ($description, $value, $paymentDate, $movementType, $accountId, $categoryId, $duplicateId);
        `);

    try {
        const params = {
            $description: transaction.description,
            $value: transaction.value,
            $paymentDate: formaterToSqlite(transaction.paymentDate),
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

export async function getAllByAccount(accountId: number, filter: TransactionFiltersModel ,database: SQLiteDatabase): Promise<TransactionRecord[] | undefined> {
    const statement = await database.prepareAsync(`
            SELECT * FROM transactions 
            WHERE account_id = $accountId 
            AND DATETIME(payment_date) >= DATETIME($initialDate) 
            AND DATETIME(payment_date) <= DATETIME($finalDate);
    `);

    try {
        const params = {
            $accountId: accountId,
            $initialDate: formaterToSqlite(filter.initialDate),
            $finalDate: formaterToSqlite(filter.finalDate)
        };

        console.log(params);
        const result = await statement.executeAsync<TransactionRecord>(params);
        const transactions = await result.getAllAsync();

        console.log(transactions);

        if(transactions) {
            return transactions;
        }
    } catch (error) {
        console.error("Error fetching transactions", error);
    } finally {
        statement.finalizeAsync();
    }

}