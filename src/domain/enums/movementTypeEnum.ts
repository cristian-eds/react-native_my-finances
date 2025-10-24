export enum MovementType {
    Receita = 'RECEITA',
    Despesa = 'DESPESA',
    Transferencia = 'TRANSFERENCIA'
}

export const frontColorByMovementType = (movementType: MovementType) => {
    switch (movementType) {
        case MovementType.Despesa:
            return 'rgba(222, 29, 29, 0.89)'
        case MovementType.Receita:
            return 'rgba(14, 142, 14, 0.89)'
        default:
            return 'rgba(24, 68, 163, 0.89)'
    }
}

export const textMovementType = (movementType: MovementType | null) => {
    switch (movementType) {
        case MovementType.Despesa:
            return 'Débitos'
        case MovementType.Receita:
            return 'Créditos'
        case MovementType.Transferencia:
            return 'Transferências'
        default:
            return 'Geral'
    }
}