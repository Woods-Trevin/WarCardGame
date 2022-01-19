const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the homepage')
});

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}....`));