import { z } from 'zod';
import { TypeAccount } from '../domain/typeAccountEnum';
import { Status } from '../domain/statusEnum';

export const accountSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    balance: z.coerce.number("O saldo inicial é obrigatório")
        .positive("O valor deve ser positivo"),
    bankCode: z.string().optional(),
    type: z.enum(TypeAccount, "Tipo conta inválido"),
    accountNumber: z.string().optional(),
    agency: z.string().optional(),
    holderName: z.string().optional(),
    status: z.enum(Status).optional(),
});