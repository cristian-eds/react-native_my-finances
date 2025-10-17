import z from "zod";
import { MovementType } from "../domain/enums/movementTypeEnum";

export const transactionSchemas = z.object({
    description: z.string()
        .nonempty('A descrição é obrigatória.'),
    value: z.coerce.number("O valor é obrigatório"),
    paymentDate: z.coerce.date('Data inválida'),
    movementType: z.enum(MovementType, "Tipo movimento inválido"),
    category: z.string('Categoria inválida!').optional(),
    accountId: z.number('A conta para transação é obrigatória')
    })
;

