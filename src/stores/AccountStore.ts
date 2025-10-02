import { create } from "zustand";
import { Account } from "../domain/accountModel";

import * as accountService from '../services/accountService';
import { SQLiteDatabase } from "expo-sqlite";
import { UpdateAccountModel } from "../domain/updateAccountModel";
import { Status } from "../domain/enums/statusEnum";

type Store = {
    accounts: Account[];
    activeAccount: Account | null;

    setAccounts: (accounts: Account[]) => void;
    setActiveAccount: (account: Account) => void;

    createAccount: (account: Omit<Account, "id">, userId: number ,database: SQLiteDatabase) => Promise<boolean>;
    updateAccount: (account: UpdateAccountModel, database: SQLiteDatabase) => Promise<boolean>;
    toggleStatusAccount: (accountId: number, database: SQLiteDatabase) => Promise<boolean>;
    deleteAccount: (accountId: number, database: SQLiteDatabase) => Promise<boolean>;
}

export const useAccountStore = create<Store>((set, get) => ({
    accounts: [],
    activeAccount: null,

    setAccounts: (accounts) => set({ accounts }),

    setActiveAccount: (account) => set({ activeAccount: account }),

    updateAccount: async  (account, database) => {
        try {
            const isUpdated = await accountService.update(account, database);
            if (!isUpdated) return false;

            const updatedAccounts = get().accounts.map((acc) =>
                acc.id === account.id ? {...acc, ...account} : acc
            );

            set({ accounts: updatedAccounts });
            if(get().activeAccount) set({ activeAccount: updatedAccounts.find(acc => acc.id === get().activeAccount?.id) || null });
            
            return true;
        } catch (error) {
            return false;
        }
    },

    toggleStatusAccount: async (accountId, database) => {    
        try {
            const isToggled = await accountService.toggleStatusAccount(accountId, database);
            if (!isToggled) return false;

            const newStatus = get().accounts.find(acc => acc.id === accountId)?.status === Status.Ativo ? Status.Inativo : Status.Ativo;
            const updatedAccounts = get().accounts.map((acc) =>
                acc.id === accountId ? {...acc, status: newStatus} : acc
            );
            set({ accounts: updatedAccounts });

            if(get().activeAccount) set({ activeAccount: updatedAccounts.find(acc => acc.id === get().activeAccount?.id) || null });
            
            return true;
        } catch (error) {
            return false;
        }
    },
    createAccount: async (account, userId,database) => {
        try {
            const accountId = await accountService.save(account, userId, database);
            if (!accountId) return false;
            set({ accounts: [...get().accounts, { ...account, id: accountId }] });
            set({ activeAccount: { ...account, id: accountId } });
            return true;
        }   catch (error) {
            return false;
        }
    },
    deleteAccount: async (accountId, database) => {
        try {
            const isDeleted = await accountService.deleteAccount(accountId, database);
            if (!isDeleted) return false;   

            const updatedAccounts = get().accounts.filter(acc => acc.id !== accountId);
            set({ accounts: updatedAccounts }); 

            if(get().activeAccount?.id === accountId) set({ activeAccount: get().accounts.length > 0 ? get().accounts[0] : null });
            return true;
        } catch (error) {
            return false;
        }
    }
    
}));

