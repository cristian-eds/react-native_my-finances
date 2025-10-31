import { MovementType } from "./enums/movementTypeEnum";

export interface TransactionFiltersModel {
    initialDate: Date,
    finalDate: Date,
    textSearch?: string,
    movementType?: MovementType[],
    categories?: number[],
    accounts?: number[]
}