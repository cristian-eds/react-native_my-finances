import { MovementType } from "../../domain/enums/movementTypeEnum";

export interface DuplicateRecord {
    id: number,
    description: string,
    total_value: number,
    issue_date: Date,
    due_date: Date,
    movement_type: MovementType,
    account_id: number,
    category_id: number,
    duplicate_father_id?: number,
    number_installments: number,
    notification_id?: string
}