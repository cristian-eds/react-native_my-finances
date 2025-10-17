import { create } from "zustand";
import { Transaction } from "../domain/transactionModel";
import { SQLiteDatabase } from "expo-sqlite";

import * as transactionService from '../services/transactionService';
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";
import { useAccountStore } from "./AccountStore";
import { MovementType } from "../domain/enums/movementTypeEnum";

type Store = {
    transactions: Transaction[];
    filters: TransactionFiltersModel;

    addTransaction: (transaction: Omit<Transaction, 'id'>, database: SQLiteDatabase) => Promise<boolean>
    fetchTransactions: (accountId: number, database: SQLiteDatabase) => void
    updateTransaction: (transaction: Transaction, database: SQLiteDatabase) => Promise<boolean>
    deleteTransaction: (idTransaction : number, database: SQLiteDatabase) => Promise<boolean>

    setFiltersDates: (initialDate: Date, finalDate: Date) => void

}

export const useTransactionStore = create<Store>((set, get) => ({
    transactions: [],
    filters: {
        initialDate: new Date(),
        finalDate: new Date()
    },
    addTransaction: async (transaction: Omit<Transaction, 'id'>, database) => {
        const idInsertedTransaction = await transactionService.create(transaction, database);
        if (!idInsertedTransaction) return false;
        const {updateBalanceAccount} = useAccountStore.getState();
        await updateBalanceAccount(transaction.accountId, transaction.value, database, transaction.movementType);
        set({
            transactions: [...get().transactions, { ...transaction, id: idInsertedTransaction }]
        })
        return true;
    },

    fetchTransactions: async (accountId: number, database: SQLiteDatabase) => {
        const transactionsFounded = await transactionService.findAllByAccount(accountId, get().filters, database);
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

    updateTransaction: async (transaction, database) => {
        try {
            const isUpdated = await transactionService.update(transaction, database);
            if (!isUpdated) return false;
            const oldTransaction = get().transactions.find(transac => transac.id === transaction.id);
            if (oldTransaction) {
                const {updateBalanceAccount} = useAccountStore.getState();
                oldTransaction?.movementType === MovementType.Receita ? 
                    await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Despesa) :
                    await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Receita);

                await updateBalanceAccount(transaction.accountId, transaction.value, database, transaction.movementType);
            }

            set({
                transactions: [...get().transactions.map(transactionSaved => transactionSaved.id === transaction.id ? transaction : transactionSaved)]
            })
            return true;
        } catch (error) {
            return false;
        }
    },

    deleteTransaction: async (idTransaction, database) => {
        try {
            const isDeleted = await transactionService.deleteById(idTransaction,database);
            if(!isDeleted) return false;
            set({
                transactions: [...get().transactions.filter(transaction => transaction.id !== idTransaction)]
            })
            return true;
        } catch (error) {
            console.log("Error deleting transaction", error)
            return false;
        }
    }
}))