import z from "zod";
import { MovementType } from "../domain/enums/movementTypeEnum";

export const categorySchemas = z.object({
    description: z.string()
        .nonempty('A descrição é obrigatória.'),
    movementType: z.enum(MovementType, "Tipo movimento inválido"),
    iconName: z.string()
        .nonempty('O icone é obrigatório.'),
    hexColor: z.string()
        .nonempty('A cor é obrigatória.'),
})
    ;