
export interface ParameterModel {
    userId: number,
    enableTransactionNotify?: boolean,
    enableDuplicateNotify?: boolean,
    enableShowBalance?: boolean,
    duplicateNotificationTime?: Date,
    defaultActiveAccountId?: number,
    transactionDefaultAccountId?: number,
    transactionDefaultCategoryExitId?: number,
    transactionDefaultCategoryEntryId?: number,
    transactionDefaultCategoryTransferId?: number,
}