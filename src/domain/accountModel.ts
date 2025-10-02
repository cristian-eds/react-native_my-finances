import { Status } from "./statusEnum";
import { TypeAccount } from "./typeAccountEnum";

export interface Account {
    id: number;
    name: string;
    balance: number;
    bankCode: string;
    type: TypeAccount;
    accountNumber: string;
    agency: string;
    holderName: string;
    status: Status;
    creationDate: string | null;
}