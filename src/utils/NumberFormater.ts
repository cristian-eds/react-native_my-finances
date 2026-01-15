export function formaterNumberToBRL(value: number = 0) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
}

export function formaterNumberToTwoFractionDigits(value: number) {
    return Intl.NumberFormat('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value / 100);
}