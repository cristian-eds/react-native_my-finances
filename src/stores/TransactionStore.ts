import { create } from "zustand";
import { Transaction } from "../domain/transactionModel";
import { SQLiteDatabase } from "expo-sqlite";

import * as transactionService from '../services/transactionService';
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";

type Store = {
    transactions: Transaction[];
    filters: TransactionFiltersModel;

    addTransaction: (transaction: Omit<Transaction, 'id'>, database: SQLiteDatabase) => Promise<boolean>
    fetchTransactions: (accountId: number, database: SQLiteDatabase) => void

    setFiltersDates: (initialDate: Date, finalDate: Date) => void
}

export const useTransactionStore = create<Store>((set,get) => ({
    transactions: [],
    filters: {
        initialDate: new Date(),
        finalDate: new Date()
    },
    addTransaction: async (transaction: Omit<Transaction, 'id'>, database) => {
        const idInsertedTransaction = await transactionService.create(transaction, database);
        if(!idInsertedTransaction) return false;
        set({
            transactions: [...get().transactions, {...transaction, id: idInsertedTransaction}]
        })
        return true;
    },

    fetchTransactions: async (accountId: number, database: SQLiteDatabase) => {
       const transactionsFounded = await transactionService.findAllByAccount(accountId, get().filters ,database);
       set({
        transactions: [...transactionsFounded]
       })
       return true;
    },

    setFiltersDates(initialDate, finalDate) {
        set({
            filters: {
                initialDate,
                finalDate
            }
        })
    },
}))