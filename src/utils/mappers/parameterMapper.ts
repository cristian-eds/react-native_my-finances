import { ParameterModel } from "../../domain/paremetersModel"
import { ParametersRecord } from "../../repository/records/ParametersRecord"


export const toParameterModel = (record: ParametersRecord): ParameterModel => {
    return {
        userId: record.user_id,
        enableTransactionNotify: record.enable_transaction_notify === 1,
        enableDuplicateNotify: record.enable_duplicate_notify === 1,
        enableShowBalance: record.enable_show_balance === 1,
        duplicateNotificationTime: new Date(`1970-01-01T${record.duplicate_notification_time}:00`),
        defaultActiveAccountId: record.default_active_account_id,
        transactionDefaultAccountId: record.transaction_default_account_id,
        transactionDefaultCategoryExitId: record.transaction_default_category_exit_id,
        transactionDefaultCategoryEntryId: record.transaction_default_category_entry_id,
        transactionDefaultCategoryTransferId: record.transaction_default_category_transfer_id
    }
}