const utils = require('./utils');

const transformItemResults = async (rawData) => {
    const mostResultCategory = getMostResultsCategory(rawData);
    return {
        categories: await getCategories(mostResultCategory.id),
        items: rawData.results.slice(0, 4).map(i => transformItem(i))
    }
}

const getMostResultsCategory = (rawData) => {
    const categories = rawData.results.map(item => item.category_id);
    const categoriesSet = new Set(categories);
    let mostResultCategory = null;
    categoriesSet.forEach(cat => {
        const categoryTemp = {
            id: cat,
            quantity: categories.reduce((sum, curr) => sum + (curr === cat ? 1 : 0), 0)
        };
        if (!mostResultCategory || mostResultCategory.quantity < categoryTemp.quantity) {
            mostResultCategory = categoryTemp;
        }
    });
    return mostResultCategory;
}

const getCategories = async (categoryId) => {
    const result = await utils.consumeAPI(`/categories/${categoryId}`);
    const data = JSON.parse(result.toJSON().body);

    return data.path_from_root;
}

const transformCommonData = (item) => {
    return {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: item.price.toFixed(0),
            decimals: utils.getDecimals(item.price)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    };
}

const transformItem = (item) => {
    return {
        ...transformCommonData(item),
        state_name: item.address.state_name
    }
}

const transformItemDetails = (item) => {
    return {
        ...transformCommonData(item),
        state_name: item.seller_address.state.name,
        sold_quantity: item.sold_quantity
    }
}

exports.transformItemResults = transformItemResults;
exports.transformItemDetails = transformItemDetails;
exports.getCategories = getCategories;