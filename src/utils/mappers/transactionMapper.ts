import { Account } from "../../domain/accountModel";
import { CategoryModel } from "../../domain/categoryModel";
import { TransactionItemData } from "../../domain/transactionItemData";
import { Transaction } from "../../domain/transactionModel";
import { TransactionRecord } from "../../repository/records/TransactionRecord";

export function toTransactionModel(record: TransactionRecord): Transaction {
    return {
        id: record.id,
        accountId: record.account_id,
        description: record.description,
        movementType: record.movement_type,
        paymentDate: new Date(`${record.payment_date}Z`),
        value: record.value,
        categoryId: record.category_id,
        duplicateId: record.duplicate_id,
        destinationAccountId: record.destination_account_id
    }
}

export function toTransactionModelList(records: TransactionRecord[]): Transaction[] {
    return records.map(toTransactionModel);
}

export function toTransactionItemData(transacation: Transaction, account: Account, category: CategoryModel, destinationAccount: Account) : TransactionItemData {
    return {
        id: transacation.id,
        description: transacation.description,
        value: transacation.value,
        paymentDate: transacation.paymentDate,
        movementType: transacation.movementType,
        accountId: transacation.accountId,
        accountName: account?.name ?? '',
        categoryId: transacation.categoryId ?? 0,
        categoryName: category.description,
        categoryHexColor: category.hexColor,
        categoryIconName: category.iconName,
        destinationAccountId: transacation.destinationAccountId,
        destinationAccountName: destinationAccount?.name,
    }
}
