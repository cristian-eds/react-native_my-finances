import z from "zod";

export const periodDatesSchemas = z.object({
    initialDate: z.coerce.date('Data inválida'),
    finalDate: z.coerce.date('Data inválida'),
    })
;
