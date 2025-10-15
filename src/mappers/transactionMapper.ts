import { MovementType } from "../domain/enums/movementTypeEnum";
import { HomeTableItem } from "../domain/homeTableItem";
import { Transaction } from "../domain/transactionModel";
import { TransactionRecord } from "../repository/records/TransactionRecord";
import { formaterNumberToBRL } from "../utils/NumberFormater";

export function toTransactionModel(record: TransactionRecord): Transaction {
    return {
        id: record.id,
        accountId: record.account_id,
        description: record.description,
        movementType: record.movement_type,
        paymentDate: new Date(`${record.payment_date}Z`),
        value: record.value,
        categoryId: record.category_id,
        duplicateId: record.duplicate_id
    }
}

export function toTransactionModelList(records: TransactionRecord[]): Transaction[] {
    return records.map(toTransactionModel);
}

export function toHomeTableItemList(transactions: Transaction[]): HomeTableItem[] {
    return transactions.map((transaction) => ({
        id: transaction.id,
        data: transaction.paymentDate.toLocaleString(),
        description: transaction.description,
        category: transaction.categoryId ?? 0,
        value: formaterNumberToBRL(transaction.value),
        movementType: transaction.movementType ?? MovementType.Despesa
    }));
}