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