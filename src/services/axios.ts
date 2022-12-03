import axios from 'axios';


export default axios.create({
    baseURL: 'https://cinemaster-api.netlify.app'
});