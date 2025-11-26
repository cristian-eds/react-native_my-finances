import z from "zod";
import { OrderTypes } from "../../domain/enums/orderTypes";
import { ColumnsOrderDuplicate } from "../../domain/enums/columnsOrderDuplicate";


export const filtersDuplicateSchemas = z.object({
    categories: z.array(z.number()).optional(),
    orderType: z.enum(OrderTypes).optional(),
    orderColumn: z.enum(ColumnsOrderDuplicate).optional()
});