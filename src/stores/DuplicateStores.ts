import { SQLiteDatabase } from "expo-sqlite"
import { DuplicateModel } from "../domain/duplicateModel"
import { create } from "zustand"
import * as duplicateService from '../services/duplicateService'
import { Transaction } from "../domain/transactionModel"
import { findTransactionsByDuplicateList } from "../services/transactionService"
import { DuplicateFiltersModel } from "../domain/duplicatesFilters"
import { OrderDuplicate } from "../domain/orderDuplicate"
import { ColumnsOrderDuplicate } from "../domain/enums/columnsOrderDuplicate"
import { OrderTypes } from "../domain/enums/orderTypes"

type Store = {
    duplicates: DuplicateModel[]
    payments: Transaction[]
    filters: DuplicateFiltersModel
    ordernation: OrderDuplicate

    addDuplicate: (duplicate: Omit<DuplicateModel, "id">, userId: number, database: SQLiteDatabase) => Promise<boolean>
    fetchDuplicates: (userId: number, database: SQLiteDatabase) => Promise<void>
    updateDuplicate: (duplicate: DuplicateModel, database: SQLiteDatabase) => Promise<boolean>
    deleteDuplicate: (duplicateId: number, database: SQLiteDatabase) => Promise<boolean>

    fetchPayments: (duplicates: DuplicateModel[], database: SQLiteDatabase) => Promise<boolean>
    setPayments: (transactions: Transaction[]) => void
    addPayment: (Transaction: Transaction) => void

    setFilterText: (text: string) => void
    setFiltersDates: (initialDate: Date, finalDate: Date) => void
    setFiltersOptions: (categories: number[] | undefined) => void
    cleanFilters: () => void

    setOrdernation: (orderColumn: ColumnsOrderDuplicate | undefined, orderType: OrderTypes | undefined) => void
}

export const useDuplicateStore = create<Store>((set, get) => ({
    duplicates: [],
    payments: [],
    filters: {
        initialDate: new Date(),
        finalDate: new Date()
    },
    ordernation: {
        orderColumn: ColumnsOrderDuplicate.DATA_VENCIMENTO,
        orderType: OrderTypes.CRESCENTE
    },
    addDuplicate: async (duplicate, userId, database) => {
        try {
            const idInserted = await duplicateService.createDuplicate(duplicate, userId, database);
            if (!idInserted) return false;
            set({
                duplicates: [...get().duplicates, { ...duplicate, id: idInserted }]
            })

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    fetchDuplicates: async (userId, database) => {
        try {
            const duplicates = await duplicateService.getAllByUser(userId, get().filters, get().ordernation, database);
            set({
                duplicates: duplicates
            })
        } catch (error) {
            console.error(error);
        }
    },
    updateDuplicate: async (duplicate, database) => {
        try {
            const isUpdated = await duplicateService.updateDuplicate(duplicate, database);
            if (isUpdated) {
                set({
                    duplicates: [...get().duplicates.map((current) => current.id === duplicate.id ? duplicate : current)]
                })
            }

            return isUpdated;

        } catch (error) {
            console.error("Error updating duplicate", error)
            return false;
        }
    },
    deleteDuplicate: async (duplicateId, database) => {
        try {
            const isDeleted = await duplicateService.deleteDuplicate(duplicateId, database);
            if (isDeleted) {
                set({
                    duplicates: [...get().duplicates.filter((current) => current.id !== duplicateId)]
                })
            }
            return isDeleted;
        } catch (error) {
            console.error("Error deleting duplicate", error)
            return false;
        }
    },
    fetchPayments: async (duplicates, database) => {
        try {
            const transactions = await findTransactionsByDuplicateList(duplicates, database);
            if (transactions) {
                set({
                    payments: transactions
                })
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    setPayments: (payments) => {
        set({
            payments: [...payments]
        })
    },
    addPayment: (transaction) => {
        set({
            payments: [...get().payments, transaction]
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
    setFiltersDates(initialDate, finalDate) {
        set({
            filters: {
                ...get().filters,
                initialDate,
                finalDate
            }
        })
    },
    setFiltersOptions: (categories) => {
        set({
            filters: {
                ...get().filters,
                categories,
            }
        })
    },
    cleanFilters: () => {
        set({
            filters: {
                ...get().filters,
                categories: undefined,
            }
        })
    },
    setOrdernation: (orderColumn, orderType) => {
        set({
            ordernation: {
                orderColumn,
                orderType
            }
        })
    }
}))