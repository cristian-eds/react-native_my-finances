export const formaterIsoDateToDefaultPattern = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }).format(data)
};

export const formaterIsoDateToDefaultPatternWithTime = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }).format(data)
};

export const formaterToday = (date: Date) => {
    return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long'
    })
}