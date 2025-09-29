import { Account } from "../../domain/accountModel";


export type PrincipalStackParamList = {
    Home: undefined;
    AccountDetails: {account: Account};
};