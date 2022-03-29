import { getDecimals } from './utils';

const transformItemResults = (rawData) => {
    return {
        categories: getCategories(rawData),
        items: rawData.results.slice(0, 4).map(i => transFormItem(i))
    }
}

function getCategories(rawData) {
    return ['Cat 1', 'Cat 2', 'Cat 3'];
}

function transFormItem(item) {
    return {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: item.price.toFixed(0),
            decimals: getDecimals(item.price)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    }
}

export default transformItemResults;