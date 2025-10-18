import { MovementType } from "../../domain/enums/movementTypeEnum";

export interface TransactionRecord {
    id: number,
    description: string,
    value: number,
    payment_date: string,
    movement_type: MovementType,
    account_id: number,
    category_id?: number,
    duplicate_id?: number
    destination_account_id?: number
}