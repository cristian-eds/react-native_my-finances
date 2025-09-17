import { z } from 'zod';

export const loginSchemas = z.object({
    cpf: z.string()
    .nonempty('O CPF é obrigatório.')
    .regex(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos numéricos.'),
    password: z.string()
        .nonempty('A senha é obrigatória.')
        .min(6, 'A senha deve ter no mínimo 6 caracteres.')
});