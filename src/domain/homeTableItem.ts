import { MovementType } from "./enums/movementTypeEnum";

export type HomeTableItem = {
    id: number,
    data: string;
    description: string;
    category: number;
    value: string;
    movementType: MovementType
};
