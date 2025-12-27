import { SQLiteDatabase } from "expo-sqlite";
import { ParameterModel } from "../domain/paremetersModel";
import * as repository from '../repository/parameterRepository';
import { toParameterModel } from "../utils/mappers/parameterMapper";

export const create = async (parameter: Omit<ParameterModel, "id">, database: SQLiteDatabase) => {
    return await repository.create(parameter, database);
}

export const getByUser = async (userId: number, database: SQLiteDatabase): Promise<ParameterModel | undefined> => {
    const record = await repository.getByUser(userId, database);
    if (!record) {
        return undefined;
    }

    return toParameterModel(record);
}
