export const formatCurrecy = (amount, currency = 'ARS') => {
    return Intl.NumberFormat('es-AR').format(amount, {
        style: 'currency',
        decimals: '',
        currency
    });
}

export const showDecimals = (decimals) => {
    if (!decimals) return '00';
    else return decimals;
}