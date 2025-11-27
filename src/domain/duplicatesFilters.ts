export interface DuplicateFiltersModel {
    initialDate: Date,
    finalDate: Date,
    textSearch?: string,
    categories?: number[],
    status?: string[]
}