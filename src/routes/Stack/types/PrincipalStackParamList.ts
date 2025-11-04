import { Account } from "../../../domain/accountModel";

export type PrincipalStackParamList = {
    Main: undefined;
    AccountDetails: {account: Account};
    Categories: undefined,
    TransactionStatistics: {data: 'transactions' | 'userTransactions'}
};