require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const Datastore = require('nedb');
const bodyParser = require('body-parser')
const authorizeSpotify = require('./authorizeSpotify')
const getAccessToken = require('./getAccessToken')
const getTopSongs = require('./getTopSongs')

const clientURL = process.env.CLIENT_URL;

const db = new Datastore();

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/login', authorizeSpotify);

app.get('/callback', getAccessToken, (req, res, next) => {
  db.insert(req.credentials, err => {
    if (err) {
      console.log("error");
      next(err);
    } else {
      console.log("noerror");
      res.redirect(`${clientURL}/?authorized=true`);
    }
  });
});

app.get('/history', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      throw Error('Failed to retrieve documents');
    }

    const accessToken = docs[0].access_token;
    getTopSongs(accessToken)
      .then(data => {
        const arr = data.map(e => ({
          name: e.name,
          popularity: e.popularity,
        }));
        console.log("data from the spot")
        console.log(arr)
        res.json(arr);
      })
      .catch(err => console.log(err));
  });
});


// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
