import { SQLiteDatabase } from "expo-sqlite";
import { Account } from "../domain/accountModel";


export async function findAccountByUser(userId: string, database: SQLiteDatabase) {

    const statement = await database.prepareAsync(` 
            SELECT * FROM account 
            WHERE user_id = $userId;
        `);

    try {
        const params = { $userId: userId };
        const result = await statement.executeAsync<Account>(params);
        const account = await result.getFirstAsync();
        if (account) {
            return account;
        }
    } catch (error) {
        console.error("Error getting account:", error);
    } finally {
        await statement.finalizeAsync();
    }
}

export async function create(account: Omit<Account, "id">, userId: string ,database: SQLiteDatabase) : Promise<Number | undefined> {
    const statement = await database.prepareAsync(` 
            INSERT INTO account (name, balance, bank_code, type, account_number, agency, holder_name, status, user_id)
            VALUES ($name, $balance, $bankCode, $type, $accountNumber, $agency, $holderName, $status, $userId);
        `);

    try {
        const params = {$name: account.name, 
                        $balance: account.balance, 
                        $bankCode: account.bankCode, 
                        $type: account.type, 
                        $accountNumber: account.accountNumber, 
                        $agency: account.agency, 
                        $holderName: account.holderName, 
                        $status: account.status, 
                        $userId: userId};

        const result = await statement.executeAsync<Account>(params);

        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error creating account:", error);
    } finally {
        await statement.finalizeAsync();
    }
}