import { MovementType } from "./enums/movementTypeEnum"

export interface DuplicateModel {
    id?: number,
    description: string,
    totalValue: number,
    issueDate: Date,
    dueDate: Date,
    movementType: MovementType,
    accountId: number,
    categoryId?: number
}