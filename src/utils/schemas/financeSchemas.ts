import z from "zod";
import { MovementType } from "../../domain/enums/movementTypeEnum";

export const financeSchemas = z.object({
    issueDate: z.coerce.date('Data emissão inválida'),
    dueDate: z.coerce.date('Data vencimento inválida'),
    totalValue: z.coerce.number("O valor é obrigatório"),
    description: z.string('A descrição é obrigatória.')
        .nonempty('A descrição é obrigatória.'),
    movementType: z.enum(MovementType, "Tipo movimento inválido"),
    categoryId: z.string('Categoria inválida!').optional(),
    accountId: z.string().optional(),
})