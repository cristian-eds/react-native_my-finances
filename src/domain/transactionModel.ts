import { MovementType } from "./enums/movementTypeEnum"

export interface Transaction {
    id: number,
    description: string,
    value: number,
    paymentDate: Date,
    movementType: MovementType,
    accountId: number,
    categoryId?: number,
    duplicateId?: number
}