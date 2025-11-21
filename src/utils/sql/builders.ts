export const buildInClause = (column: string, values: (string | number)[], paramPrefix: string) => {
    if (values.length === 0) return { clause: '', params: {} };
    const placeholders = values.map((_, index) => `$${paramPrefix}${index}`).join(", ");
    const params = values.map((value, index) => ({ [`$${paramPrefix}${index}`]: value }));
    return { clause: ` AND ${column} IN (${placeholders}) `, params: Object.assign({}, ...params) };
}