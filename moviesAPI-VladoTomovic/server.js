const express = require('express');
const HTTP_PORT = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();

const MoviesDB = require('./modules/moviesDB.js');
const db = new MoviesDB();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Listening...');
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .thencle(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// POST /api/movies
// This route uses the body of the request to add a new "Movie" document to the collection and return the
// newly created movie object / fail message to the client.

app.post('/api/movies', (req, res) => {
  if (Object.keys(req.body).length == 0)
    res.status(500).json({ error: 'Invalid movie title' });
  else {
    db.addNewMovie(req.body)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
});

// GET /api/movies
// This route must accept the numeric query parameters "page" and "perPage" as well as the (optional) string
// parameter "title", ie: /api/movies?page=1&perPage=5&title=The Avengers. It will use these values to return
// all "Movie" objects for a specific "page" to the client as well as optionally filtering by "title", if provided (in
// this case, it will show both “The Avengers” films).

app.get('/api/movies', (req, res) => {
  if (!req.query.page || req.query.perPage)
    res.status(500).json({ error: 'Bad query params' });
  else {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
      .then((data) => {
        if (data.length == 0) res.status(204).json({ message: 'No content' });
        else res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
});

//  GET /api/movies
// This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e. It will use this parameter to return a specific "Movie" object to
// the client.

app.get('api/movies/:_id', (req, res) => {
  db.getMovieById(req.params._id)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//  PUT /api/movies
// This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e as well as read the contents of the request body. It will use these
// values to update a specific "Movie" document in the collection and return a success / fail message to the
// client.

app.put('/api/movies/:_id', (req, res) => {
  if (Object.keys(req.body).length === 0)
    res.status(500).json({ error: 'Body is invalid' });
  else {
    db.updateMovieById(req.body, req.params._id).then(() => {
      res
        .status(201)
        .json({ message: 'Movie title updated: Success' })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    });
  }
});

//  DELETE /api/movies
// This route must accept a route parameter that represents the _id of the desired movie object, ie:
// /api/movies/573a1391f29313caabcd956e. It will use this value to delete a specific "Movie" document from
// the collection and return a success / fail message to the client

app.delete('/api/movies/:_id', (req, res) => {
  db.deleteMovieById(req.params._id)
    .then(() => {
      res.status(201).json({ message: 'Movie deleted: Success' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
