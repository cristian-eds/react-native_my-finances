import { SQLiteDatabase } from 'expo-sqlite'
import { DuplicateModel } from '../domain/duplicateModel'
import * as duplicateRepository from '../repository/duplicateRepository'
import { fromRecordListToModelList } from '../utils/mappers/duplicateMapper';
import { DuplicateFiltersModel } from '../domain/duplicatesFilters';
import { OrderDuplicate } from '../domain/orderDuplicate';
import { scheduleDuplicateNotification } from './notificationService';

export const createDuplicate = async (duplicate: Omit<DuplicateModel, "id">, userId: number, database: SQLiteDatabase) => {
    const idCreated = await duplicateRepository.create(duplicate, userId.toLocaleString(), database);
    if (!idCreated) return null;
    const idNotification = await scheduleDuplicateNotification({ ...duplicate, id: idCreated });
    return idCreated;
}

export const getAllByUser = async (userId: number, filters: DuplicateFiltersModel, ordenation: OrderDuplicate, database: SQLiteDatabase) => {
    const duplicates = await duplicateRepository.getAllByUser(userId.toLocaleString(), filters, ordenation, database);
    if (!duplicates) return [];
    return fromRecordListToModelList(duplicates);
}

export const updateDuplicate = async (duplicate: DuplicateModel, database: SQLiteDatabase) => {
    return await duplicateRepository.udpate(duplicate, database);
}

export const deleteDuplicate = async (duplicateId: number, database: SQLiteDatabase) => {
    return await duplicateRepository.deleteDuplicate(duplicateId.toLocaleString(), database)
}

export const createRecurrenceDuplicates = async (duplicates: Omit<DuplicateModel, "id">[], userId: number, database: SQLiteDatabase) => {
    const createdDuplicates = [];
    let idFirstDuplicate: number | undefined = undefined;
    for (let i = 0; i < duplicates.length; i++) {
        const duplicate = duplicates[i];
        if(i > 0 && idFirstDuplicate) {
            duplicate.duplicateFatherId = idFirstDuplicate;
        }
        const createdDuplicate = await createDuplicate(duplicate, userId, database);
        if(i === 0 && createdDuplicate) { 
            idFirstDuplicate = createdDuplicate;
        }
        createdDuplicates.push(createdDuplicate);
    }  

    if(idFirstDuplicate && createdDuplicates.length > 1) {
        await duplicateRepository.udpateFatherId(idFirstDuplicate.toLocaleString(),idFirstDuplicate.toLocaleString(), database);
    }
    return createdDuplicates;
}

export const getByFatherId = async (fatherId: number, userId: number,database: SQLiteDatabase) => {
    const duplicates = await duplicateRepository.getByFatherId(fatherId.toLocaleString(), userId.toLocaleString(), database);
    if (!duplicates) return [];
    return fromRecordListToModelList(duplicates);
}