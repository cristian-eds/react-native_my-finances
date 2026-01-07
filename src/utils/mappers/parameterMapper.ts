import { ParameterModel } from "../../domain/paremetersModel"
import { ParametersRecord } from "../../repository/records/ParametersRecord"


export const toParameterModel = (record: ParametersRecord): ParameterModel => {
    return {
        userId: record.user_id,
        enableTransactionNotify: record.enable_transaction_notify === 1,
        enableDuplicateNotify: record.enable_duplicate_notify === 1,
        enableShowBalance: record.enable_show_balance === 1,
        duplicateNotificationTime: new Date(`1970-01-01T${record.duplicate_notification_time}:00`)
    }
}
