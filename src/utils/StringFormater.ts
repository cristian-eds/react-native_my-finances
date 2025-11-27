export const capitalizeWord = (word: string) => {
    const lower = word.toLocaleLowerCase();

    const firstLetter = lower.charAt(0).toLocaleUpperCase();

    const restWord = lower.slice(1);

    return firstLetter + restWord;

}   

export const formaterEnumKeyToLabel = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}