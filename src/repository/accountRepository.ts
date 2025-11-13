import { SQLiteDatabase } from "expo-sqlite";
import { Account } from "../domain/accountModel";
import { UpdateAccountModel } from "../domain/updateAccountModel";
import { AccountRecord } from "./records/AccountRecord";
import { Status } from "../domain/enums/statusEnum";

export async function findAccountByUser(userId: string, database: SQLiteDatabase): Promise<AccountRecord[] | undefined> {

    const statement = await database.prepareAsync(` 
            SELECT * FROM accounts 
            WHERE user_id = $userId;
        `);

    try {
        const params = { $userId: userId };
        const result = await statement.executeAsync<AccountRecord>(params);
        const accounts = await result.getAllAsync();
        if (accounts) {
            return accounts
        }
    } catch (error) {
        console.error("Error getting account:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

export async function create(account: Omit<Account, "id">, userId: string, database: SQLiteDatabase): Promise<number | undefined> {
    try {
        const res = await database.runAsync(
            ` 
            INSERT INTO accounts (name, balance, bank_code, type, account_number, agency, holder_name, status, user_id, creation_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,[account.name,account.balance,account.bankCode,account.type,account.accountNumber, account.agency, account.holderName, account.status, userId, new Date().toISOString()]
        )

        return res.lastInsertRowId;
    } catch (error) {
        console.error("Error creating account:", error);
    } 
}

export async function update(account: UpdateAccountModel, database: SQLiteDatabase): Promise<boolean> {
    try {
        const response = await database.runAsync(` 
            UPDATE accounts  
            SET name = ?, 
                bank_code = ?,  
                type = ?,
                account_number = ?,
                agency = ?,
                holder_name = ?
            WHERE id = ?;
        `, [account.name, account.bankCode, account.type, account.accountNumber, account.agency, account.holderName, account.id])

        return response.changes > 0;
    } catch (error) {
        console.error("Error updating account:", error);
        return false;
    }
}

export async function toggleStatusAccount(accountId: number, newStatus: Status,database: SQLiteDatabase): Promise<boolean> {
    try {
        const currentStatus = await getAccountStatus(accountId, database);
        const res = await database.runAsync(` 
            UPDATE accounts  
            SET status = ?
            WHERE id = ?;
        `, [newStatus, accountId.toLocaleString()]);

        return res.changes > 0;
    } catch (error) {
        console.error("Error inactivating account:", error);
        return false;
    }
}

async function getAccountStatus(accountId: number, database: SQLiteDatabase): Promise<string | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT status FROM accounts 
            WHERE id = $id;
        `);

    try {
        const params = { $id: accountId.toLocaleString() };
        const result = await statement.executeAsync<Account>(params);
        const account = await result.getFirstAsync();
        if (account) {
            return account.status;
        }
        return undefined;
    } catch (error) {
        console.error("Error getting account status:", error);
        return undefined;
    } finally {
        await statement.finalizeAsync();
    }
}

export async function deleteAccount(accountId: number, database: SQLiteDatabase): Promise<boolean> {
    try {
        const response = await database.runAsync(` 
            DELETE FROM accounts  
            WHERE id = ?;
        `, [accountId.toLocaleString()]);

        return response.changes > 0;
    } catch (error) {
        console.error("Error deleting account:", error);
        return false;
    }
}

export async function updateAccountBalance(accountId: number, newBalance: number, database: SQLiteDatabase): Promise<boolean> {
    try {
        const result = await database.runAsync(`
                UPDATE accounts 
                SET  balance = ?
                WHERE id = ?
                `, [newBalance, accountId]);
        return result.changes > 0;
    } catch (error) {
        console.error('Error updating account balance', error);
        return false;
    }
}