import { TypeAccount } from "./enums/typeAccountEnum";

export interface UpdateAccountModel {
    id: number;
    name: string;
    bankCode: string;
    type: TypeAccount;
    accountNumber: string;
    agency: string;
    holderName: string;
}