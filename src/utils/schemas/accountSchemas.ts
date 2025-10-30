import { z } from 'zod';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { Status } from '../../domain/enums/statusEnum';


export const accountSchemas = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    balance: z.coerce.number("O saldo inicial é obrigatório")
        .nonnegative("O valor deve ser positivo"),
    bankCode: z.string().optional(),
    type: z.enum(TypeAccount, "Tipo conta inválido"),
    accountNumber: z.string().optional(),
    agency: z.string().optional(),
    holderName: z.string().optional(),
    status: z.enum(Status).optional(),
});