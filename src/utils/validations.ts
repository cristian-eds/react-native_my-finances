export function isValidProp(prop: any): boolean {
    if (prop === null || prop === undefined) {
        return false;
    }
    if (Array.isArray(prop)) {
        return prop.length > 0;
    }
    return Boolean(prop);
}