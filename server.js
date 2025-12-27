const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const indexRoute = require('./routes/index');

app.use('/', indexRoute);

app.listen(4000, () => {
    console.log('running!');
});