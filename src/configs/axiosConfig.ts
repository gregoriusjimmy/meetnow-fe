import axios from 'axios';

// TODO: handle undefined extra
axios.defaults.baseURL = 'https://testingmn.streamzinu.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
