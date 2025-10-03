import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "../repository/records/TransactionRecord";

export function toTransactionModel(record: TransactionRecord) : Transaction{
    return {
        id: record.id,
        accountId: record.account_id,
        description: record.description,
        movementType: record.movement_type,
        paymentDate: new Date(record.payment_date),
        value: record.value,
        categoryId: record.category_id,
        duplicateId: record.duplicate_id
    }
}

export function toTransactionModelList(records: TransactionRecord[]) : Transaction[] {
    return records.map(toTransactionModel);
}