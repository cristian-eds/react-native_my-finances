import { Ionicons } from "@expo/vector-icons";
import { MovementType } from "./enums/movementTypeEnum";

export type TransactionItemData = {
    id: number,
    description: string;
    value: number;
    paymentDate: Date;
    movementType: MovementType
    accountId?: number;
    accountName?: string;
    categoryId?: number;
    categoryName?: string;
    categoryHexColor?: string,
    categoryIconName?: keyof typeof Ionicons.glyphMap,
    destinationAccountId?: number;
    destinationAccountName?: string;
};
