

export const currencyFormatter = (value: number) => {
    return value.toLocaleString('es-Es', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        minimumIntegerDigits: 2,
    });
};