import { CategoryModel } from "../../domain/categoryModel";
import { CategoryRecord } from "../../repository/records/CategoryRecord";

export function toModel(categoryRecod: CategoryRecord): CategoryModel {
    return {
        id: categoryRecod.id,
        description: categoryRecod.description,
        hexColor: categoryRecod.hex_color,
        iconName: categoryRecod.icon_name,
        expenseFavorite: Boolean(categoryRecod.expense_favorite),
        incomeFavorite: Boolean(categoryRecod.income_favorite)
    }
}

export function toModelList(categoriesRecord: CategoryRecord[]): CategoryModel[] {
    return categoriesRecord.map(toModel);
}