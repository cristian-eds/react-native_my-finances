import { SQLiteDatabase } from "expo-sqlite";

import * as accountRepository from '../repository/accountRepository'

export async function getAccountByUser(userId: Number, database: SQLiteDatabase) {
    
    const account = await accountRepository.findAccountByUser(userId.toLocaleString(), database);

    return account;
}