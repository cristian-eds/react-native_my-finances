import { CategoryModel } from "../domain/categoryModel";
import { CategoryRecord } from "../repository/records/CategoryRecord";


export function toModel(categoryRecod: CategoryRecord): CategoryModel {
    return {
        id: categoryRecod.id,
        description: categoryRecod.description,
        hexColor: categoryRecod.hex_color,
        iconName: categoryRecod.icon_name,
        movementType: categoryRecod.movement_type
    }
}

export function toModelList(categoriesRecord: CategoryRecord[]): CategoryModel[] {
    return categoriesRecord.map(toModel);
}