import { SQLiteDatabase } from 'expo-sqlite';
import * as transactionRepository from '../repository/transactionRepository';
import { Transaction } from '../domain/transactionModel';

export async function create(transaction: Omit<Transaction, 'id'> ,database: SQLiteDatabase) {
    return transactionRepository.create(transaction,database);
}