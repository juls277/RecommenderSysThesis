const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const PORT = 3000;

// Load movies from JSON file
let movies = [];

fs.readFile('./movies.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading movies.json');
    return;
  }
  movies = JSON.parse(data);
});

// Endpoint: GET /movies — list all movies
app.get('/movies', (req, res) => {
  const response = movies.map(movie => ({
    id: movie.movieId,
    title: movie.title,
    _links: {
      self: { href: `/movies/${movie.movieId}` }
    }
  }));
  res.json(response);
});

// Endpoint: GET /movies/:id — details of a single movie
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.movieId == req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });

  res.json({
    id: movie.movieId,
    title: movie.title,
    genres: movie.genres,
    _links: {
      self: { href: `/movies/${movie.movieId}` },
      list: { href: '/movies' }
    }
  });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
