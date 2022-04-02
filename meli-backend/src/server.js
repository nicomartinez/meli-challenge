const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const utils = require('./utils');
const transformUtils = require('./transformUtils');

const AUTHOR_DATA = {
    name: 'Nicolas',
    lastname: 'Martinez'
};
const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());



app.get('/api/items', async (req, res) => {
    const query = req.query.q;
    try {
        const itemsResult = await utils.consumeAPI(`/sites/MLA/search?q=${query}`);
        const results = await transformUtils.transformItemResults(JSON.parse(itemsResult.toJSON().body));
        res.status(200).json({ author: AUTHOR_DATA, ...results});
    } catch (e) {
        res.status(500).json({ message: 'Error obteniendo información de la fuente', e });
    }
});

app.get('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const itemResult = await utils.consumeAPI(`/items/${id}`);
        const rawItem = JSON.parse(itemResult.toJSON().body);
        const item = transformUtils.transformItemDetails(rawItem);
        const itemDescriptionResult = await utils.consumeAPI(`/items/${id}/description`);
        item.description = JSON.parse(itemDescriptionResult.toJSON().body).plain_text;
        res.status(200).json({ 
            author: AUTHOR_DATA,
            item,
            categories: await transformUtils.getCategories(rawItem.category_id)
        });
    } catch (e) {
        res.status(500).json({ message: 'Error obteniendo información de la fuente', e });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));