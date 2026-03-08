import axios from "axios";
import * as http from 'http';
import * as https from 'https';

const httpAgent = new http.Agent({ keepAlive: true , maxSockets: 50});
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 50 });

const apiClient = axios.create({
    httpAgent: httpAgent, 
    httpsAgent: httpsAgent
})


export default apiClient