import { MovementType } from "./enums/movementTypeEnum";

export type HomeTableItem = {
    id: number,
    data: string;
    description: string;
    categoria: string;
    value: string;
    movementType: MovementType
};
