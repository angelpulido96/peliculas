import axios  from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '3b87d75c7d0dd4a8ef4ce571002f6f29',
        language: 'es-ES'
    }
});

export default movieDB;