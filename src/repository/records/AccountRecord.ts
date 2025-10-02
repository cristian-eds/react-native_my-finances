import { Status } from "../../domain/enums/statusEnum";
import { TypeAccount } from "../../domain/enums/typeAccountEnum";

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