import z from "zod";
import { MovementType } from "../../domain/enums/movementTypeEnum";

export const filtersSchemas = z.object({
    movementType: z.array(z.enum(MovementType, "Tipo movimento inválido")).optional(),
    categories: z.array(z.string()).optional(),
    accounts: z.array(z.string()).optional(),
});