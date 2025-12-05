import { z } from 'zod';

export const changePasswordSchemas = z.object({
    password: z.string()
        .nonempty('A senha é obrigatória.')
        .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    newPassword: z.string()
        .nonempty('A nova senha é obrigatória.')
        .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
    confirmNewPassword: z.string()
        .nonempty('A confirmação de senha é obrigatória.'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmNewPassword'],
});