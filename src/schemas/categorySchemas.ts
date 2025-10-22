import z from "zod";
import { MovementType } from "../domain/enums/movementTypeEnum";
import { iconsOptions } from "../utils/IconOptions";
import { hexColorOptions } from "../utils/HexColorOptions";

const iconValues = iconsOptions.map(item => item.value);
const hexColorValues = hexColorOptions.map(item => item.value);

export const categorySchemas = z.object({
    description: z.string()
        .nonempty('A descrição é obrigatória.'),
    iconName: z.enum(iconValues, 'Nome icone inválido').or(z.literal('')),
    hexColor: z.enum(hexColorValues, 'Cor inválida'),
})
