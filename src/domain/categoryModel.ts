import { Ionicons } from "@expo/vector-icons";
import { MovementType } from "./enums/movementTypeEnum";

export interface CategoryModel {
    id: number,
    description: string,
    movementType: MovementType,
    hexColor: string,
    iconName: keyof typeof Ionicons.glyphMap
}