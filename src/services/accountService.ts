import { SQLiteDatabase } from "expo-sqlite";

import * as accountRepository from '../repository/accountRepository'
import { Account } from "../domain/accountModel";
import { UpdateAccountModel } from "../domain/updateAccountModel";
import { toAccountDomainModelList } from "../utils/mappers/accountMapper";
import { Status } from "../domain/enums/statusEnum";

export async function getAccountsByUser(userId: number, database: SQLiteDatabase): Promise<Account[] | undefined> {
    const accounts = await accountRepository.findAccountByUser(userId.toLocaleString(), database);
    if(!accounts) return undefined;
    return toAccountDomainModelList(accounts) ;
}

export async function save(account: Omit<Account, "id">, userId: number, database: SQLiteDatabase): Promise<number | undefined> {
    return await accountRepository.create(account, userId.toLocaleString(), database);
}

export async function update(account: UpdateAccountModel, database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.update(account, database);
}

export async function toggleStatusAccount(accountId: number, newStatus: Status,database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.toggleStatusAccount(accountId,newStatus, database);
}

export async function deleteAccount(accountId: number, database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.deleteAccount(accountId, database);
}

export async function updateAccountBalance(accountId: number, newBalance: number,database: SQLiteDatabase) {
    return await accountRepository.updateAccountBalance(accountId, newBalance, database);
}

export async function deleteAccountsByUserId(userId: number, database: SQLiteDatabase): Promise<boolean>  {
    return await accountRepository.deleteAccountsByUserId(userId.toLocaleString(), database);
}

