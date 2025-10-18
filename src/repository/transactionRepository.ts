import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "./records/TransactionRecord";
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";
import { formaterToSqlite } from "../utils/DateFormater";

export async function create(transaction: Omit<Transaction, "id">, database: SQLiteDatabase): Promise<number | undefined> {

    try {
        const result = await database.runAsync(` 
            INSERT INTO transactions (description, value, payment_date, movement_type, account_id, category_id, duplicate_id, destination_account_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [transaction.description,
            transaction.value,
            formaterToSqlite(transaction.paymentDate),
            transaction.movementType,
            transaction.accountId,
            transaction.categoryId ?? null,
            transaction.duplicateId ?? null,
            transaction.destinationAccountId ?? null
        ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating transaction:", error);
    }
}

export async function getAllByAccount(accountId: number, filter: TransactionFiltersModel, database: SQLiteDatabase): Promise<TransactionRecord[] | undefined> {
    const statement = await database.prepareAsync(`
            SELECT * FROM transactions 
            WHERE account_id = $accountId 
            AND DATETIME(payment_date) >= DATETIME($initialDate) 
            AND DATETIME(payment_date) <= DATETIME($finalDate);
    `);

    try {
        const params = {
            $accountId: accountId,
            $initialDate: formaterToSqlite(new Date(filter.initialDate.setHours(0, 0, 1))),
            $finalDate: formaterToSqlite(new Date(filter.finalDate.setHours(23, 59, 59)))
        };

        const result = await statement.executeAsync<TransactionRecord>(params);
        const transactions = await result.getAllAsync();

        if (transactions) {
            return transactions;
        }
    } catch (error) {
        console.error("Error fetching transactions", error);
    } finally {
        statement.finalizeAsync();
    }
}



export async function update(transaction: Transaction, database: SQLiteDatabase): Promise<boolean> {

    const statement = await database.prepareAsync(`
            UPDATE transactions
            SET description = $description,
                value = $value,
                payment_date = $paymentDate,
                movement_type = $movementType,
                account_id = $accountId,
                category_id = $categoryId,
                duplicate_id = $duplicateId
            WHERE id = $id;
        `);

    try {
        const params = {
            $description: transaction.description,
            $value: transaction.value,
            $paymentDate: formaterToSqlite(transaction.paymentDate),
            $movementType: transaction.movementType,
            $accountId: transaction.accountId,
            $categoryId: transaction.categoryId ?? null,
            $duplicateId: transaction.duplicateId ?? null,
            $id: transaction.id
        };

        const result = await statement.executeAsync<TransactionRecord>(params);
        return result.changes > 0;
    } catch (error) {
        console.error("Error fetching transactions", error);
        return false;
    } finally {
        statement.finalizeAsync();
    }

}

export async function deleteById(idTransaction: number, database: SQLiteDatabase): Promise<boolean> {

    try {
        const result = await database.runAsync(
            `DELETE FROM transactions WHERE id = ?;`,
            idTransaction
        );

        return result.changes > 0;

    } catch (error) {
        console.error("Erro ao deletar transação", error);
        return false;
    }
}


