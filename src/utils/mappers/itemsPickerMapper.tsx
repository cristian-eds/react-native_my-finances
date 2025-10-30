import { ReactElement } from "react";
import { CategoryModel } from "../../domain/categoryModel";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Account } from "../../domain/accountModel";

export interface ItemDropdown {
    label: string,
    value: string,
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
    return accounts.map(acc => { return { label: acc.name, value: acc.id.toString() } });
}