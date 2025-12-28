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
import { scheduleDuplicateNotification } from "../services/notificationService"

type Store = {
    duplicates: DuplicateModel[]
    payments: Transaction[]
    filters: DuplicateFiltersModel
    ordernation: OrderDuplicate

    addDuplicate: (duplicate: Omit<DuplicateModel, "id">, userId: number, database: SQLiteDatabase) => Promise<boolean>
    fetchDuplicates: (userId: number, database: SQLiteDatabase) => Promise<void>
    updateDuplicate: (duplicate: DuplicateModel, database: SQLiteDatabase) => Promise<boolean>
    deleteDuplicate: (duplicateId: number, database: SQLiteDatabase) => Promise<boolean>
    createRecurrenceDuplicates: (duplicates: Omit<DuplicateModel, "id">[], userId: number, database: SQLiteDatabase) => Promise<boolean>

    fetchPayments: (database: SQLiteDatabase) => Promise<boolean>
    setPayments: (transactions: Transaction[]) => void
    addPayment: (Transaction: Transaction) => void

    setFilterText: (text: string) => void
    setFiltersDates: (initialDate: Date, finalDate: Date) => void
    setFiltersOptions: (categories: number[] | undefined, status: string[] | undefined) => void
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
            const idNotification = await scheduleDuplicateNotification({ ...duplicate, id: idInserted });
            let updated = false;
            if (idNotification) {
                updated = await duplicateService.updateNotificationId(idNotification, idInserted, database);
            }
            set({
                duplicates: [...get().duplicates, { ...duplicate, id: idInserted, notificationId: updated && idNotification ? idNotification : undefined }]
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

    createRecurrenceDuplicates: async (duplicates, userId, database) => {
        try {
            const idsInserted = await duplicateService.createRecurrenceDuplicates(duplicates, userId, database);
            const createdDuplicates = duplicates.map((dup, index) => ({
                ...dup,
                id: idsInserted[index]
            }))
            const duplicatesWithNotifications = await Promise.all(createdDuplicates.map(async (dup) => {
                const idNotification = await scheduleDuplicateNotification({...dup, id: dup.id!});
                if (idNotification) {
                    await duplicateService.updateNotificationId(idNotification, dup.id!, database);
                }
                return {
                    ...dup,
                    notificationId: idNotification
                }
            }));
            set({
                duplicates: [...get().duplicates, ...duplicatesWithNotifications.filter(dup => get().filters.initialDate < dup.dueDate && get().filters.finalDate > dup.dueDate)] as DuplicateModel[]
            })
            return true;
        }
        catch (error) {
            console.error("Error creating recurrence duplicates", error)
            return false;
        }
    },
    fetchPayments: async (database) => {
        try {

            const transactions = await findTransactionsByDuplicateList(get().duplicates, database);
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
    setFiltersOptions: (categories, status) => {
        set({
            filters: {
                ...get().filters,
                categories,
                status
            }
        })
    },
    cleanFilters: () => {
        set({
            filters: {
                ...get().filters,
                categories: undefined,
                status: undefined,
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