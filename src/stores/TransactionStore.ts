import { create } from "zustand";
import { Transaction } from "../domain/transactionModel";
import { SQLiteDatabase } from "expo-sqlite";

import * as transactionService from '../services/transactionService';
import { TransactionFiltersModel } from "../domain/transactionFiltersModel";
import { useAccountStore } from "./AccountStore";
import { MovementType } from "../domain/enums/movementTypeEnum";

type Store = {
    transactions: Transaction[];
    transactionsUser: Transaction[];
    filters: TransactionFiltersModel;

    addTransaction: (transaction: Omit<Transaction, 'id'>, userId: number, database: SQLiteDatabase) => Promise<boolean>
    fetchTransactions: (accountId: number ,database: SQLiteDatabase) => void
    updateTransaction: (transaction: Transaction, database: SQLiteDatabase) => Promise<boolean>
    deleteTransaction: (idTransaction: number, database: SQLiteDatabase) => Promise<boolean>
    fetchTransactionsByUser: (userId: number, database: SQLiteDatabase) => void

    setFiltersDates: (initialDate: Date, finalDate: Date) => void
    setFilterText: (text: string) => void
    setFiltersOptions: (movementType: MovementType[] | undefined, categories: number[] | undefined, accounts: number[] | undefined) => void
    cleanFilters: () => void

}

export const useTransactionStore = create<Store>((set, get) => ({
    transactions: [],
    transactionsUser: [],
    filters: {
        initialDate: new Date(),
        finalDate: new Date()
    },
    addTransaction: async (transaction, userId, database) => {
        const idInsertedTransaction = await transactionService.create(transaction, userId.toLocaleString(),database);
        if (!idInsertedTransaction) return false;
        const { updateBalanceAccount, activeAccount } = useAccountStore.getState(); 

        await updateBalanceAccount(transaction.accountId, transaction.value, database, transaction.movementType);

        if(transaction.movementType === MovementType.Transferencia && transaction.destinationAccountId) {
            await updateBalanceAccount(transaction.destinationAccountId, transaction.value, database, MovementType.Receita);
        }

        if (transaction.accountId === activeAccount?.id) {
            set({
                transactions: [...get().transactions, { ...transaction, id: idInsertedTransaction }],
                transactionsUser: [...get().transactionsUser, { ...transaction, id: idInsertedTransaction }]
            })
        }
        return true;
    },

    fetchTransactions: async (accountId, database) => {
        const transactionsFounded = await transactionService.findAllByAccount(accountId, get().filters, database);
        set({
            transactions: [...transactionsFounded]
        })
        return true;
    },

    fetchTransactionsByUser: async (userId, database) => {
        const transactionsFounded = await transactionService.findAllByUser(userId.toLocaleString(), get().filters,database);
        set({
            transactionsUser: [...transactionsFounded]
        })
        return true;
    },

    setFiltersDates(initialDate, finalDate) {
        set({
            filters: {
                 ...get().filters,
                initialDate,
                finalDate
            }
        })
    },

    setFilterText(text) {
        set({
            filters: {
                 ...get().filters,
                textSearch: text, 
            }
        })
    },

    setFiltersOptions: (movementType, categories, accounts) => {
        set({
            filters: {  
                ...get().filters,
                movementType, 
                categories, 
                accounts, 
                }
        })
    },
    cleanFilters: () => {
        set({
            filters: {  
                ...get().filters,
                movementType: undefined,
                categories: undefined,
                accounts: undefined,    
            }
        })
    },

    updateTransaction: async (transaction, database) => {
        try {
            const isUpdated = await transactionService.update(transaction, database);
            if (!isUpdated) return false;
            const oldTransaction = get().transactions.find(transac => transac.id === transaction.id);
            if (oldTransaction) {
                const { updateBalanceAccount } = useAccountStore.getState();
                if (oldTransaction.movementType === MovementType.Receita) await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Despesa);
                if (oldTransaction.movementType === MovementType.Despesa || oldTransaction.movementType === MovementType.Transferencia) await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Receita);
                await updateBalanceAccount(transaction.accountId, transaction.value, database, transaction.movementType);

                if (oldTransaction.destinationAccountId) {
                    await updateBalanceAccount(oldTransaction.destinationAccountId, oldTransaction.value, database, MovementType.Despesa);
                    await updateBalanceAccount(oldTransaction.destinationAccountId, transaction.value, database, MovementType.Receita);
                }

            }

            
            set({
                transactions: [...get().transactions.map(transactionSaved => transactionSaved.id === transaction.id ? transaction : transactionSaved)],
                transactionsUser: [...get().transactionsUser.map(transactionSaved => transactionSaved.id === transaction.id ? transaction : transactionSaved)]
            })
            return true;
        } catch (error) {
            return false;
        }
    },

    deleteTransaction: async (idTransaction, database) => {
        try {
            const isDeleted = await transactionService.deleteById(idTransaction, database);
            if (!isDeleted) return false;
            const oldTransaction = get().transactions.find(transaction => transaction.id === idTransaction);
            if (oldTransaction) {
                const { updateBalanceAccount } = useAccountStore.getState();

                if (oldTransaction.movementType === MovementType.Receita) await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Despesa);
                if (oldTransaction.movementType === MovementType.Despesa) await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Receita);
                
                if (oldTransaction.movementType === MovementType.Transferencia && oldTransaction.destinationAccountId) {
                    await transactionService.deleteByFatherId(oldTransaction.id, database);
                    await updateBalanceAccount(oldTransaction.accountId, oldTransaction.value, database, MovementType.Receita);
                    await updateBalanceAccount(oldTransaction.destinationAccountId, oldTransaction.value, database, MovementType.Despesa);

                }
            }
            set({
                transactions: [...get().transactions.filter(transaction => transaction.id !== idTransaction)],
                transactionsUser: [...get().transactionsUser.filter(transaction => transaction.id !== idTransaction)]
            })
            return true;
        } catch (error) {
            console.log("Error deleting transaction", error)
            return false;
        }
    }
}))