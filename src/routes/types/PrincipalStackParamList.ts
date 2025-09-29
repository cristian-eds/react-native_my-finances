import { Account } from "../../domain/accountModel";


export type PrincipalStackParamList = {
    Main: undefined;
    AccountDetails: {account: Account};
};