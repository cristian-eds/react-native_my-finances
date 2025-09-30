import { create } from "zustand";
import { Account } from "./src/domain/accountModel";

import * as accountService from './src/services/accountService';
import { SQLiteDatabase } from "expo-sqlite";
import { UpdateAccountModel } from "./src/domain/updateAccountModel";
import { Status } from "./src/domain/statusEnum";

type Store = {
    accounts: Account[];
    activeAccount: Account | null;

    setAccounts: (accounts: Account[]) => void;
    setActiveAccount: (account: Account) => void;

    updateAccount: (account: UpdateAccountModel, database: SQLiteDatabase) => Promise<boolean>;
    toggleStatusAccount: (accountId: Number, database: SQLiteDatabase) => Promise<boolean>;
}

export const useStore = create<Store>((set, get) => ({
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
}));

