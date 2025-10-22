import { SQLiteDatabase } from 'expo-sqlite';
import * as transactionRepository from '../repository/transactionRepository';
import { Transaction } from '../domain/transactionModel';
import { toTransactionModelList } from '../mappers/transactionMapper';
import { TransactionFiltersModel } from '../domain/transactionFiltersModel';

export async function create(transaction: Omit<Transaction, 'id'>, database: SQLiteDatabase) {
    return transactionRepository.create(transaction, database);
}

export async function findAllByAccount(accountId: number, filters: TransactionFiltersModel, database: SQLiteDatabase) {
    const transactions = await transactionRepository.getAllByAccount(accountId, filters, database);
    if (!transactions) return [];
    return toTransactionModelList(transactions);
}

export async function update(transaction: Transaction, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.update(transaction, database);
}

export async function deleteById(idTransaction: number, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.deleteById(idTransaction, database);
}

export async function deleteByFatherId(idTransaction: number, database: SQLiteDatabase): Promise<boolean>  {
    return await transactionRepository.deleteByFatherId(idTransaction, database);
}