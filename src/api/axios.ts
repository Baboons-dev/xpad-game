import axios, {AxiosInstance} from 'axios';
import { clean } from '@/utils';

const TIMEOUT = 25 * 1000;  //15sec
const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST || 'https://api.xpad-extension.baboons.tech';
// const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:8080';

const instance: AxiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key':
            process.env.REACT_APP_TITLE_X_KEY ||'9KVvI9QM_98vtE__EYrhCgxFad-6do8fRB9050923uc',
    },
    params: clean({
        t: new Date().getTime(),
    }),
    timeout: TIMEOUT
});
instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token && config?.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['x-api-key'] =
            process.env.NEXT_PUBLIC_TITLE_X_KEY ||
            '9KVvI9QM_98vtE__EYrhCgxFad-6do8fRB9050923uc';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        console.log('err response in intercept resp', err?.response?.data);


        const originalConfig = err?.config;
        if (originalConfig?.url === '/api/current/' && err.response) {
            //todo --> refresh the refresh token
            console.log('refresh token expired');
            return Promise.reject(err);
        }
        console.log(err?.response)
        if (err?.response?.status == 401 && originalConfig?.url === '/api/current/') {
            localStorage.removeItem('token')
            location.reload()
        }

        return Promise.reject(err);
    },
);


export default instance;
