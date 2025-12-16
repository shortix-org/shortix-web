import axios from 'axios';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

const API_URL = import.meta.env.VITE_API_URL;

const poolData = {
    UserPoolId: import.meta.env.VITE_USER_POOL_ID || '',
    ClientId: import.meta.env.VITE_CLIENT_ID || '',
};
const userPool = new CognitoUserPool(poolData);

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
    return new Promise((resolve) => {
        const currentUser = userPool.getCurrentUser();
        if (currentUser) {
            currentUser.getSession((err: any, session: any) => {
                if (!err && session.isValid()) {
                    const token = session.getIdToken().getJwtToken();
                    config.headers.Authorization = token;
                }
                resolve(config);
            });
        } else {
            resolve(config);
        }
    });
});

export default api;
