import { SQLiteDatabase } from "expo-sqlite";

import * as accountRepository from '../repository/accountRepository'
import { Account } from "../domain/accountModel";

export async function getAccountByUser(userId: Number, database: SQLiteDatabase) {
    
    const account = await accountRepository.findAccountByUser(userId.toLocaleString(), database);

    return account;
}

export async function save(account: Omit<Account, "id">, userId: Number, database: SQLiteDatabase): Promise<Number | undefined> {
    return await accountRepository.create(account, userId.toLocaleString(), database);
}