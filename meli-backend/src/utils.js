const request = require('request');
const util = require('util');

const API_URL = 'http://api.mercadolibre.com';

const getDecimals = (amount) => {
    return (amount % 1).toFixed(2).substring(2);
}

const consumeAPI = (route) => {
    const newPromise = util.promisify(request);
    return newPromise(API_URL.concat(route));
}

exports.getDecimals = getDecimals;
exports.consumeAPI = consumeAPI;