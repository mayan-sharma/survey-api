const express = require('express');

const routes = require('./routes');

const app = express();

// to parse json requests
app.use(express.json());

app.use('/api', routes)

// start listening
app.listen(3000, () => {
    console.log(`Server running on port ${3000}`)
})