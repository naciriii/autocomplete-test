const express = require('express');
const app = express()
const port = 8000;
const data = require('./data')

app.use(express.static('public'));

app.get('/api/fruits', (req, res) => {
    res.json(data);
})

app.listen(port, () => {
    console.log("Connected on PORT: " + port);
})
