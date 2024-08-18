import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://poker247tech.ru/get_horoscope/',
});

export default instance;