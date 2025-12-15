import z from "zod";

export const resetPasswordSchemas = z.object({
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