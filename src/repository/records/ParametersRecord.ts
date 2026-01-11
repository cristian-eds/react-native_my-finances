export interface ParametersRecord {
    user_id: number,
    enable_transaction_notify: number,
    enable_duplicate_notify: number,
    duplicate_notification_time: string,
    enable_show_balance: number,
    default_active_account_id?: number,
    transaction_default_account_id?: number,
    transaction_default_category_exit_id?: number,
    transaction_default_category_entry_id?: number,
    transaction_default_category_transfer_id?: number,  
}