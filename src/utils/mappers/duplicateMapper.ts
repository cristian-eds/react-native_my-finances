import { DuplicateModel } from "../../domain/duplicateModel";
import { DuplicateRecord } from "../../repository/records/DuplicateRecord";

export function fromRecordToModel(record: DuplicateRecord) : DuplicateModel{
    return {
        accountId: record.account_id,
        categoryId: record.category_id,
        description: record.description,
        dueDate: record.due_date,
        id: record.id,
        issueDate: record.issue_date,
        movementType: record.movement_type,
        totalValue: record.total_value,
        numberInstallments: record.number_installments,
        duplicateFatherId: record.duplicate_father_id,
    }
}

export function fromRecordListToModelList(records: DuplicateRecord[]) : DuplicateModel[] {
    return records.map(fromRecordToModel);
}