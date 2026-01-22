import z from "zod";
import { TypeRecurrence } from "../../domain/enums/typeRecurrence";
import { MovementType } from "../../domain/enums/movementTypeEnum";

export const installmentsSchemas = z.object({
    numberInstallments: z.coerce.number().min(1, "O número mínimo de parcelas é 1"),
    typeRecurrence: z.enum(TypeRecurrence).optional(),
    value: z.coerce.number("O valor é obrigatório").positive('O valor é obrigatório'),
    movementType: z.enum(MovementType, "Tipo movimento inválido"),
    description: z.string('A descrição é obrigatória.')
            .nonempty('A descrição é obrigatória.'),
    categoryId: z.string('Categoria inválida!').optional(),
    intervalBetweenInstallments: z.coerce.number("Número intervalo inválido").min(1, "O intervalo mínimo é de 1 dia").optional(),
    fixedInstallmentDate: z.coerce.number("Dia fixo inválido").min(1, "O dia fixo deve ser entre 1 e 31").max(31, "O dia fixo deve ser entre 1 e 31").optional(),
}).superRefine((data, ctx) => {
    if (data.typeRecurrence === TypeRecurrence.Fixo) {
        if (data.fixedInstallmentDate === undefined || data.fixedInstallmentDate === null) {
            ctx.addIssue({
                code: 'custom',
                message: "O dia fixo de vencimento é obrigatório para recorrência FIXA.",
                path: ['fixedInstallmentDate'],
            });
        }
    }
    if (data.typeRecurrence === TypeRecurrence.Intervalo) {
        if (data.intervalBetweenInstallments === undefined || data.intervalBetweenInstallments === null) {
            ctx.addIssue({
                code: 'custom',
                message: "O intervalo entre parcelas é obrigatório para recorrência por INTERVALO.",
                path: ['intervalBetweenInstallments'],
            });
        }
    }
});

export type InstallmentsForm = z.infer<typeof installmentsSchemas>;