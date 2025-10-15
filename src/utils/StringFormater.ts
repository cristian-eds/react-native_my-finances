export const capitalizeWord = (word: string) => {
    const lower = word.toLocaleLowerCase();

    const firstLetter = lower.charAt(0).toLocaleUpperCase();

    const restWord = lower.slice(1);

    return firstLetter + restWord;

}   