import { SQLiteDatabase } from "expo-sqlite";
import { Account } from "../domain/accountModel";
import { UpdateAccountModel } from "../domain/updateAccountModel";
import { AccountRecord } from "./records/AccountRecord";
import { Status } from "../domain/statusEnum";

export async function findAccountByUser(userId: string, database: SQLiteDatabase): Promise<AccountRecord[] | undefined> {

    const statement = await database.prepareAsync(` 
            SELECT * FROM account 
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
    const statement = await database.prepareAsync(` 
            INSERT INTO account (name, balance, bank_code, type, account_number, agency, holder_name, status, user_id, creation_date)
            VALUES ($name, $balance, $bankCode, $type, $accountNumber, $agency, $holderName, $status, $userId, $creation_date);
        `);

    try {
        const params = {
            $name: account.name,
            $balance: account.balance,
            $bankCode: account.bankCode,
            $type: account.type,
            $accountNumber: account.accountNumber,
            $agency: account.agency,
            $holderName: account.holderName,
            $status: account.status,
            $userId: userId,
            $creation_date: new Date().toISOString()
        };

        const result = await statement.executeAsync<Account>(params);

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating account:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

export async function update(account: UpdateAccountModel, database: SQLiteDatabase): Promise<boolean> {
    const statement = await database.prepareAsync(` 
            UPDATE account  
            SET name = $name, 
                bank_code = $bankCode,  
                type = $type,
                account_number = $accountNumber,
                agency = $agency,
                holder_name = $holderName
            WHERE id = $id;
        `);

    try {
        const params = {
            $name: account.name,
            $bankCode: account.bankCode,
            $type: account.type,
            $accountNumber: account.accountNumber,
            $agency: account.agency,
            $holderName: account.holderName,
            $id: account.id
        };
        const response = await statement.executeAsync(params);
        return response.changes > 0;
    } catch (error) {
        console.error("Error updating account:", error);
        return false;
    } finally {
        await statement.finalizeAsync();
    }
}

export async function toggleStatusAccount(accountId: Number, database: SQLiteDatabase): Promise<boolean> {
    const statement = await database.prepareAsync(` 
            UPDATE account  
            SET status = $status
            WHERE id = $id;
        `);
    try {
        const currentStatus = await getAccountStatus(accountId, database);
    
        if (!currentStatus) return false;

        const params = { $id: accountId.toLocaleString(), $status: currentStatus === Status.Ativo ? Status.Inativo : Status.Ativo };
        const response = await statement.executeAsync(params);
        return response.changes > 0;
    } catch (error) {
        console.error("Error inactivating account:", error);
        return false;
    } finally {
        await statement.finalizeAsync();
    }
}

async function getAccountStatus(accountId: Number, database: SQLiteDatabase): Promise<string | undefined> {
    const statement = await database.prepareAsync(` 
            SELECT status FROM account 
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
    }   finally {
        await statement.finalizeAsync();
    }
}   