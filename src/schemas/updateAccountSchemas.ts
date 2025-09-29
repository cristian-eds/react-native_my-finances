import { z } from 'zod';
import { TypeAccount } from '../domain/typeAccountEnum';

export const updateAccountSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    bankCode: z.string().optional(),
    type: z.enum(TypeAccount, "Tipo conta inválido"),
    accountNumber: z.string().optional(),
    agency: z.string().optional(),
    holderName: z.string().optional()
});