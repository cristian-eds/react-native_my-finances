import { z } from 'zod';

export const changeUserDataSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório.')
        .min(2, 'O nome deve ter no mínimo 2 caracteres.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.'), 
    cpf: z.string()
    .nonempty('O CPF é obrigatório.')
    .regex(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos numéricos.'),
});
