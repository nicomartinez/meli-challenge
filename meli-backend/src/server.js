import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import request from 'request';
import transformItemResults from './transformItemResults';

const API_URL = 'http://api.mercadolibre.com';
const AUTHOR_DATA = {
    name: 'Nicolas',
    lastname: 'Martinez'
};
const app = express();

app.use(cors);
app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());

const consumeAPI = (route, operations, res) => {
    request(API_URL.concat(route), (err, body) => {
        if (err) {
            res.status(500).json({ message: 'Error obteniendo información de la fuente', error });
        } else {
            operations(body.toJSON());
        }
    });
}

app.get('/api/items', async (req, res) => {
    const query = req.query.q;
    await consumeAPI(`/sites/MLA/search?q=${query}`, (data) => {
        const results = transformItemResults(JSON.parse(data.body));
        res.status(200).json({ author: AUTHOR_DATA, ...results});
    }, res);
});

app.get('/api/items/:id', async (req, res) => {
    const query = req.params.id;
    consumeAPI(`/sites/MLA/search?q=${query}`, (data) => {
        const results = transformResults(data);
        res.status(200).json({ ...AUTHOR_DATA, ...results});
    }, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log('Listening on port 8000'));