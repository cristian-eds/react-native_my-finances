import { ReactElement } from "react";
import { CategoryModel } from "../../domain/categoryModel";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Account } from "../../domain/accountModel";
import { MovementType } from "../../domain/enums/movementTypeEnum";
import { OrderTypes } from "../../domain/enums/orderTypes";
import { ColumnsOrderTransaction } from "../../domain/enums/columnsOrderTransaction";
import { ColumnsOrderDuplicate } from "../../domain/enums/columnsOrderDuplicate";
import { DuplicateStatus } from "../../domain/enums/duplicateStatusEnun";
import { formaterEnumKeyToLabel } from "../StringFormater";
import { TypeRecurrence } from "../../domain/enums/typeRecurrence";

export interface ItemDropdown {
    label: string,
    value: string | number,
    icon?: () => ReactElement
}

export const mapCategoriesToItemsDropdown = (categories: CategoryModel[]): ItemDropdown[] => {
    return categories.map(category => {
        return {
            label: category.description,
            value: category.id.toString(),
            icon: () => <View key={category.id} style={{ backgroundColor: category.hexColor, borderRadius: 50, padding: 4 }}><Ionicons name={category.iconName} size={18} color="white" /></View>
        }
    })
}

export const mapAccountsToItemsDropdown = (accounts: Account[]): ItemDropdown[] => {
    return accounts.map(acc => { return { label: acc.name, value: acc.id.toLocaleString() } });
}

export const mapMovementTypesToItemsDropdown = () => Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })

export const mapOrderTypesToItemsDropdown = () => Object.keys(OrderTypes).map((text) => {
    const label = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return { label, value: OrderTypes[text as keyof typeof OrderTypes] }
})

export const mappColumnsOrderTransactionToItemsDropdown = () => Object.keys(ColumnsOrderTransaction).map((key) => {
    const value = ColumnsOrderTransaction[key as keyof typeof ColumnsOrderTransaction];
    const label = formaterEnumKeyToLabel(key);
    return { label, value };
})

export const mappColumnsOrderDuplicateToItemsDropdown = () => Object.keys(ColumnsOrderDuplicate).map((key) => {
    const value = ColumnsOrderDuplicate[key as keyof typeof ColumnsOrderDuplicate];
    const label = formaterEnumKeyToLabel(key);
    return { label, value };
})

export const mappDuplicateStatusToItemsDropdown = () => Object.keys(DuplicateStatus).map((key) => {
    const value = DuplicateStatus[key as keyof typeof DuplicateStatus];
    const label = formaterEnumKeyToLabel(key);
    return { label, value };
})

export const mapTypeRecurrenceToItemsDropdown = () => Object.keys(TypeRecurrence).map((key) => {
    const value = TypeRecurrence[key as keyof typeof TypeRecurrence];
    const label = formaterEnumKeyToLabel(key);
    return { label, value };
})