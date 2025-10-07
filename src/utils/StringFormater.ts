export const capitalizeWord = (word: string) => {
    const lower = word.toLocaleLowerCase();

    const firstLetter = word.charAt(0).toLocaleUpperCase();

    const restWord = word.slice(1);

    return firstLetter + restWord;

}   