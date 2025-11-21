import { SQLiteDatabase } from 'expo-sqlite'
import { DuplicateModel } from '../domain/duplicateModel'
import * as duplicateRepository from '../repository/duplicateRepository'
import { fromRecordListToModelList } from '../utils/mappers/duplicateMapper';

export const createDuplicate = async (duplicate: Omit<DuplicateModel, "id">, userId: number, database: SQLiteDatabase) => {
    return await duplicateRepository.create(duplicate, userId.toLocaleString(), database);
}

export const getAllByUser = async (userId: number, database: SQLiteDatabase) => {
    const duplicates = await duplicateRepository.getAllByUser(userId.toLocaleString(), database);
    if(!duplicates) return [];
    return fromRecordListToModelList(duplicates);
}

export const updateDuplicate = async (duplicate: DuplicateModel, database: SQLiteDatabase) => {
    return await duplicateRepository.udpate(duplicate, database);
}

export const deleteDuplicate = async (duplicateId: number, database: SQLiteDatabase) => {
    return await duplicateRepository.deleteDuplicate(duplicateId.toLocaleString(), database)
}