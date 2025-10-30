import { Account } from "../../domain/accountModel";
import { AccountRecord } from "../../repository/records/AccountRecord";

export function toAccountDomainModel(record: AccountRecord): Account {
    return {
        id: record.id,
        name: record.name,
        balance: record.balance,
        bankCode: record.bank_code,
        type: record.type,
        accountNumber: record.account_number,
        agency: record.agency,
        holderName: record.holder_name,
        status: record.status,
        creationDate: record.creation_date 
    };
}

export function toAccountDomainModelList(records: AccountRecord[]): Account[] {
    return records.map(toAccountDomainModel);
}