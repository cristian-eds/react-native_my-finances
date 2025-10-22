import { Ionicons } from "@expo/vector-icons";
import { MovementType } from "../../domain/enums/movementTypeEnum";

export interface CategoryRecord {
    id: number,
    description: string,
    hex_color: string,
    icon_name: keyof typeof Ionicons.glyphMap,
    expense_favorite?: number,
    income_favorite?: number
}