const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

let database = JSON.parse(fs.readFileSync('movies.json'));


app.get('/', (req, res) => {
    res.send('Welcome to ARC XXI');
});

// Get All Films
app.get('/movies', (req, res) => {
    res.json(database);
});

// Get movie by ID
app.get('/movies/:id', (req, res) => {
    const movie = database.find(item => item.imdbID === req.params.id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Add a movie
app.post('/movies', (req, res) => {
    const newMovie = req.body;
    database.push(newMovie);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    res.json({ message: 'Movie added successfully' });
});

// Delete movie by ID
app.delete('/movies/:id', (req, res) => {
    database = database.filter(item => item.imdbID !== req.params.id);
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    res.json({ message: 'Movie deleted successfully' });
});

// Update movie by ID
app.put('/movies/:id', (req, res) => {
    const updatedMovieIndex = database.findIndex(item => item.imdbID === req.params.id);
    if (updatedMovieIndex !== -1) {
        database[updatedMovieIndex] = req.body;
        fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
        res.json({ message: 'Movie updated successfully' });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Search movies by title
app.get('/search', (req, res) => {
    const searchTerm = req.query.title;
    const results = database.filter(item => item.Title.toLowerCase().includes(searchTerm.toLowerCase()));
    res.json(results);
});

// Simpan perubahan saat server mati
process.on('SIGINT', () => {
    fs.writeFileSync('database.json', JSON.stringify(database, null, 2));
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});