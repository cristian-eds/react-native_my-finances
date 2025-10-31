import { SQLiteDatabase } from "expo-sqlite";
import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "./records/TransactionRecord";
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";
import { formaterToSqlite } from "../utils/DateFormater";

export async function create(transaction: Omit<Transaction, "id">, userId: string, database: SQLiteDatabase): Promise<number | undefined> {

    try {
        const result = await database.runAsync(` 
            INSERT INTO transactions (description, value, payment_date, movement_type, account_id, category_id, duplicate_id, destination_account_id, transaction_father_id,user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?);
        `, [transaction.description,
        transaction.value,
        formaterToSqlite(transaction.paymentDate),
        transaction.movementType,
        transaction.accountId,
        transaction.categoryId ?? null,
        transaction.duplicateId ?? null,
        transaction.destinationAccountId ?? null,
        transaction.transactionFatherId ?? null,
            userId
        ])

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating transaction:", error);
    }
}

export async function getAllByAccount(accountId: number, filter: TransactionFiltersModel, database: SQLiteDatabase): Promise<TransactionRecord[] | undefined> {
    const statement = await database.prepareAsync(`
            SELECT * FROM transactions 
            WHERE (account_id = $accountId OR destination_account_id = $accountId)
            AND payment_date BETWEEN $initialDate AND $finalDate
            ORDER BY DATETIME(payment_date) DESC;
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

export async function getAllByUser(userId: string, filters: TransactionFiltersModel, database: SQLiteDatabase): Promise<TransactionRecord[] | undefined> {

    const buildInClause = (column: string, values: (string | number)[], paramPrefix: string) => {
        if (values.length === 0) return { clause: '', params: {} };
        const placeholders = values.map((_, index) => `$${paramPrefix}${index}`).join(", ");
        const params =  values.map((value, index) => ({ [`$${paramPrefix}${index}`]: value }));
        return { clause: ` AND ${column} IN (${placeholders}) `, params: Object.assign({}, ...params) };
    }

    let sql = ` SELECT * FROM transactions 
            WHERE user_id = $userId
            AND payment_date BETWEEN $initialDate AND $finalDate`;

    if (filters.textSearch) {
        sql += ` AND description LIKE $textSearchQuery `;
    }

    const { clause: movementTypeClause, params: movementTypeParams } = buildInClause('movement_type', filters.movementType || [], 'movementType');
    const { clause: categoryClause, params: categoryParams } = buildInClause('category_id', filters.categories || [], 'categoryId');
    const { clause: accountClause, params: accountParams } = buildInClause('account_id', filters.accounts || [], 'accountId');

    sql += movementTypeClause + categoryClause + accountClause;
    sql += ` ORDER BY DATETIME(payment_date) DESC; `;

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

        Object.assign(params, movementTypeParams, categoryParams, accountParams);

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

    try {
        const res = await database.runAsync(`
            UPDATE transactions
            SET description = ?,
                value = ?,
                payment_date = ?,
                movement_type = ?,
                account_id = ?,
                category_id = ?,
                duplicate_id = ?
            WHERE id = ?;
        `, [
            transaction.description,
            transaction.value, formaterToSqlite(transaction.paymentDate),
            transaction.movementType,
            transaction.accountId,
            transaction.categoryId ?? null,
            transaction.duplicateId ?? null,
            transaction.id
        ])

        return res.changes > 0;
    } catch (error) {
        console.error("Error fetching transactions", error);
        return false;
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

export async function deleteByFatherId(idTransaction: number, database: SQLiteDatabase): Promise<boolean> {

    try {
        const result = await database.runAsync(
            `DELETE FROM transactions WHERE transaction_father_id = ?;`,
            idTransaction
        );

        return result.changes > 0;

    } catch (error) {
        console.error("Erro ao deletar transação", error);
        return false;
    }
}


