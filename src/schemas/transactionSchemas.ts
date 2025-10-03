import z from "zod";

export const transactionSchemas = z.object({
    description: z.string()
        .nonempty('A descrição é obrigatória.'),
    value: z.coerce.number("O valor é obrigatório")
        .positive("O valor deve ser positivo"),
    paymentDate: z.coerce.date('Data inválida'),
    })
;
