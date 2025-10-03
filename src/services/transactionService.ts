import { SQLiteDatabase } from 'expo-sqlite';
import * as transactionRepository from '../repository/transactionRepository';
import { Transaction } from '../domain/transactionModel';
import { toTransactionModelList } from '../mappers/transactionMapper';

export async function create(transaction: Omit<Transaction, 'id'> ,database: SQLiteDatabase) {
    return transactionRepository.create(transaction,database);
}

export async function findAllByAccount(accountId: number,database: SQLiteDatabase) {
    const transactions = await transactionRepository.getAllByAccount(accountId, database);
    if(!transactions) return [];
    return toTransactionModelList(transactions);
}