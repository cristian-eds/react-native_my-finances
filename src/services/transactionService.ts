import { SQLiteDatabase } from 'expo-sqlite';
import * as transactionRepository from '../repository/transactionRepository';
import { Transaction } from '../domain/transactionModel';
import { toTransactionModelList } from '../utils/mappers/transactionMapper';
import { TransactionFiltersModel } from '../domain/transactionFiltersModel';
import { OrderTransactionModel } from '../domain/orderTransactionModel';
import { DuplicateModel } from '../domain/duplicateModel';
import { notifyTransactionNotification } from './notificationService';
import { useParameterStore } from '../stores/ParameterStore';

export async function create(transaction: Omit<Transaction, 'id'>, userId: string, database: SQLiteDatabase) {
    const idCreated = await transactionRepository.create(transaction, userId, database);
    if (!idCreated) return null;
    const { parameters } = useParameterStore.getState();
    if (parameters.enableTransactionNotify) {
        await notifyTransactionNotification({ ...transaction, id: idCreated });
    }
    return idCreated;
}


export async function findAllByUser(userId: number, filters: TransactionFiltersModel, ordenation: OrderTransactionModel, database: SQLiteDatabase) {
    const transactions = await transactionRepository.getAllByUser(userId.toString(), filters, ordenation, database);
    if (!transactions) return [];
    return toTransactionModelList(transactions);
}


export async function update(transaction: Transaction, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.update(transaction, database);
}

export async function deleteById(idTransaction: number, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.deleteById(idTransaction, database);
}

export async function deleteByFatherId(idTransaction: number, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.deleteByFatherId(idTransaction, database);
}

export async function findTransactionsByDuplicateId(duplicateId: string, database: SQLiteDatabase): Promise<Transaction[]> {
    const transactionsRecords = await transactionRepository.findTransactionsByDuplicateId(duplicateId, database);
    if (!transactionsRecords) return [];
    return toTransactionModelList(transactionsRecords);
}

export async function findTransactionsByDuplicateList(duplicates: DuplicateModel[], database: SQLiteDatabase): Promise<Transaction[]> {
    const transactionsRecords = await transactionRepository.findTrnasactionsByDuplicateList(duplicates.map(duplicate => duplicate.id), database);
    if (!transactionsRecords) return [];
    return toTransactionModelList(transactionsRecords);
}

export async function deleteTransactionsByUserId(userId: number, database: SQLiteDatabase): Promise<boolean> {
    return await transactionRepository.deleteByUserId(userId.toLocaleString(), database);
}
