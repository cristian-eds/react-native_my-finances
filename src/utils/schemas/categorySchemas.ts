import z from "zod";
import { hexColorOptions } from "../HexColorOptions";
import { iconsOptions } from "../IconOptions";

const iconValues = iconsOptions.map(item => item.value);
const hexColorValues = hexColorOptions.map(item => item.value);

export const categorySchemas = z.object({
    description: z.string()
        .nonempty('A descrição é obrigatória.'),
    iconName: z.enum(iconValues, 'Nome icone inválido').or(z.literal('')),
    hexColor: z.enum(hexColorValues, 'Cor inválida'),
})
