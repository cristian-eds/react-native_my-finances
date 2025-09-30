import { SQLiteDatabase } from "expo-sqlite";

import * as accountRepository from '../repository/accountRepository'
import { Account } from "../domain/accountModel";
import { UpdateAccountModel } from "../domain/updateAccountModel";
import { toAccountDomainModelList } from "../mappers/accountMapper";

export async function getAccountByUser(userId: Number, database: SQLiteDatabase): Promise<Account[] | undefined> {
    const accounts = await accountRepository.findAccountByUser(userId.toLocaleString(), database);
    if(!accounts) return undefined;
    return toAccountDomainModelList(accounts) ;
}

export async function save(account: Omit<Account, "id">, userId: Number, database: SQLiteDatabase): Promise<Number | undefined> {
    return await accountRepository.create(account, userId.toLocaleString(), database);
}

export async function update(account: UpdateAccountModel, database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.update(account, database);
}

export async function toggleStatusAccount(accountId: Number, database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.toggleStatusAccount(accountId, database);
}