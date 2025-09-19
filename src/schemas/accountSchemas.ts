import { z } from 'zod';
import { TypeAccount } from '../domain/typeAccountEnum';
import { Status } from '../domain/statusEnum';

export const accountSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    balance: z.number("O saldo inicial é obrigatório")
        .positive("O valor deve ser positivo"),
    bankCode: z.string(),
    type: z.enum(TypeAccount, "Tipo conta inválido"),
    accountNumber: z.string(),
    agency: z.string(),
    holderName: z.string(),
    status: z.enum(Status),
});