import { z } from 'zod';
import { TypeAccount } from '../domain/typeAccountEnum';
import { Status } from '../domain/statusEnum';

export const accountSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    balance: z.number()
        .positive("O valor deve ser positivo"),
    bankCode: z.string(),
    type: z.enum(TypeAccount),
    accountNumber: z.string(),
    agency: z.string(),
    holderName: z.string(),
    status: z.enum(Status),
});