import z from "zod";
import { MovementType } from "../../domain/enums/movementTypeEnum";
import { ColumnsOrderTransaction } from "../../domain/enums/columnsOrderTransaction";
import { OrderTypes } from "../../domain/enums/orderTypes";

export const filtersTransactionSchemas = z.object({
    movementType: z.array(z.enum(MovementType, "Tipo movimento inválido")).optional(),
    categories: z.array(z.number()).optional(),
    accounts: z.array(z.number()).optional(),
    orderType: z.enum(OrderTypes).optional(),
    orderColumn: z.enum(ColumnsOrderTransaction).optional()
});