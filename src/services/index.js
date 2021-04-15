import axios from 'axios';

const connect = axios.create({ baseURL: 'http://localhost:3000' });

export default connect;