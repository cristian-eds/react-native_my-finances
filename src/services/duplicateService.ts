import { SQLiteDatabase } from 'expo-sqlite'
import { DuplicateModel } from '../domain/duplicateModel'
import * as duplicateRepository from '../repository/duplicateRepository'

export const createDuplicate = async (duplicate: Omit<DuplicateModel, "id">, userId: string, database: SQLiteDatabase) => {
    return duplicateRepository.create(duplicate, userId, database);
}