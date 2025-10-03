import { create } from "zustand";
import { Transaction } from "../domain/transactionModel";
import { SQLiteDatabase } from "expo-sqlite";

import * as transactionService from '../services/transactionService';

type Store = {
    transactions: Transaction[];

    addTransaction: (transaction: Omit<Transaction, 'id'>, database: SQLiteDatabase) => Promise<boolean>
}

export const useTransactionStore = create<Store>((set,get) => ({
    transactions: [],

    addTransaction: async (transaction: Omit<Transaction, 'id'>, database) => {
        const idInsertedTransaction = await transactionService.create(transaction, database);
        if(!idInsertedTransaction) return false;
        set({
            transactions: [...get().transactions, {...transaction, id: idInsertedTransaction}]
        })
        return true;
    }
}))