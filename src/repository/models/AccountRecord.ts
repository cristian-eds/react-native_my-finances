import { Status } from "../../domain/statusEnum";
import { TypeAccount } from "../../domain/typeAccountEnum";

export interface AccountRecord {
    id: number;
    name: string;
    balance: number;
    bank_code: string;
    type: TypeAccount;
    account_number: string;
    agency: string;
    holder_name: string;
    status: Status;
    creation_date: string;
}