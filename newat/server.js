const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const Datastore  require('nedb');
const bodyParser = require('body-parser')

const clientURL = process.env.CLIENT_URL;

const db = new Datastore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
