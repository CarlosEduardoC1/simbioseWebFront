import axios from 'axios';

const connect = axios.create({ baseURL: ' http://localhost:3080' });

export default connect;