const axios = require('axios');

axios.get('http://localhost:3000/movies')
    .then(response => {
        console.log('All movies:');
        console.log(response.data);
    })
    .catch(error => {
        console.error('Gagal mendapatkan list movies:', error);
    });

axios.get('http://localhost:3000/movies/tt0168366')
    .then(response => {
        console.log('Movie by ID:');
        console.log(response.data);
    })
    .catch(error => {
        console.error('Gagal mendapatkan film dari ID:', error);
    });


axios.delete('http://localhost:3000/movies/tt0210234')
    .then(response => {
        console.log('Movie deleted successfully');
    })
    .catch(error => {
        console.error('Gagal menghapus film:', error);
    });


axios.get('http://localhost:3000/search?title=Pokémon')
    .then(response => {
        console.log('Search results:');
        console.log(response.data);
    })
    .catch(error => {
        console.error('Gagal mendapatkan film dari judul:', error);
    });