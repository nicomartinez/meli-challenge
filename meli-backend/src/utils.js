export const getDecimals = (amount) => {
    return (amount % 1).toFixed(2).substring(2);
}