import { ReactElement } from "react";
import { CategoryModel } from "../../domain/categoryModel";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Account } from "../../domain/accountModel";
import { MovementType } from "../../domain/enums/movementTypeEnum";
import { OrderTypes } from "../../domain/enums/orderTypes";
import { ColumnsOrderTransaction } from "../../domain/enums/columnsOrderTransaction";

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
            icon: () => <View key={category.id} style={{ backgroundColor: category.hexColor, borderRadius: 50, padding: 2 }}><Ionicons name={category.iconName} size={24} color="black" /></View>
        }
    })
}

export const mapAccountsToItemsDropdown = (accounts: Account[]): ItemDropdown[] => {
    return accounts.map(acc => { return { label: acc.name, value: acc.id } });
}

export const mapMovementTypesToItemsDropdown = () => Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })

export const mapOrderTypesToItemsDropdown = () => Object.keys(OrderTypes).map((text) => {
    const label = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return { label, value: OrderTypes[text as keyof typeof OrderTypes] }
})

export const mappColumnsOrderTransactionToItemsDropdown = () => Object.keys(ColumnsOrderTransaction).map((key) => {
    const value = ColumnsOrderTransaction[key as keyof typeof ColumnsOrderTransaction];
    const label = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    return { label, value };
})