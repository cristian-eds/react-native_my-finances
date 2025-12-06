import z from "zod";
import { MovementType } from "../../domain/enums/movementTypeEnum";

export const financeSchemas = z.object({
    issueDate: z.string('Data emissão inválida'),
    dueDate: z.string('Data vencimento inválida'),
    totalValue: z.string('Valor é obrigatório').min(0.01, "O valor mínimo é R$ 0,01"),
    description: z.string('A descrição é obrigatória.')
        .nonempty('A descrição é obrigatória.'),
    movementType: z.enum(MovementType, "Tipo movimento inválido"),
    categoryId: z.string('Categoria inválida!').optional(),
    accountId: z.string().optional(),
});

export type FinanceFormFields = z.infer<typeof financeSchemas>