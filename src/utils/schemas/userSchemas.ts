import { z } from 'zod';

export const userSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório.')
        .min(2, 'O nome deve ter no mínimo 2 caracteres.')
        .max(100, 'O nome deve ter no máximo 100 caracteres.'), 
    cpf: z.string()
    .nonempty('O CPF é obrigatório.')
    .regex(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos numéricos.'),
    password: z.string()
        .nonempty('A senha é obrigatória.')
        .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    confirmPassword: z.string()
        .nonempty('A confirmação de senha é obrigatória.'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
});