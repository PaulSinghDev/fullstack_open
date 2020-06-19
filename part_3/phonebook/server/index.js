const express = require('express');
const { request } = require('express');
const app = express();
const persons = require('./db/persons.json');
const cors = require('cors');
const morgan = require('morgan');

morgan.token('body', (request) => request.body !== {} ? JSON.stringify(request.body) : ' ');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

require('./routes/routes')(app, persons);

const PORT = process.env.PORT || 3001;

app.listen(PORT);

console.log(`Server listening on port ${PORT}`);

