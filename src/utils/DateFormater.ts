import { capitalizeWord } from "./StringFormater";

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

export const getPatterDateDayMonthDigit = (date: Date = new Date()) => {
    return Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'numeric'
    }).format(date);
}

export const getDatePatternMonthShortYearDigit = (date: Date = new Date()) => {
    const month = Intl.DateTimeFormat('pt-BR', {
        month: 'short'
    }).format(date);

    const year = date.getFullYear();

    return `${capitalizeWord(month)}/${year}`
}

export const getWeekBounds = (date: Date = new Date()) => {
  const currentDate = new Date(date); 

  const dayOfWeek = currentDate.getDay(); 

  const firstDay = new Date(currentDate);
  firstDay.setDate(currentDate.getDate() - dayOfWeek);
  firstDay.setHours(0, 0, 0, 0);

  const lastDay = new Date(currentDate);
  lastDay.setDate(currentDate.getDate() + (6 - dayOfWeek));

  lastDay.setHours(23, 59, 59, 999);

  return {
    firstDay,
    lastDay,
  };
};

export const getLastDayOfMonth = (year: number, monthIndex: number) => {
    const firstDayOfNextMonth = new Date(year, monthIndex + 1, 1);
    const lastDay = new Date(firstDayOfNextMonth.setDate(0));
    return lastDay;
}

export const getDateWithNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export const getDateWithPrevMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}