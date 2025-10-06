import { MovementType } from "./enums/movementTypeEnum";

export type HomeTableItem = {
    data: string;
    description: string;
    categoria: string;
    value: string;
    movementType: MovementType
};
