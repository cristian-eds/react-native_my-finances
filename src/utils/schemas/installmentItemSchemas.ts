import z from "zod";

export const installmentsItemSchemas = z.object({
    description: z.string("A descrição é obrigatória").min(1, "A descrição é obrigatória"),
    dueDate: z.coerce.date('Data vencimento inválida'),
    value: z.coerce.number("O valor é obrigatório").positive("O valor deve ser positivo"),
})