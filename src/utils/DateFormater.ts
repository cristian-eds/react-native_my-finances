export const formaterIsoDateToDefaultPattern = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }).format(data)
};