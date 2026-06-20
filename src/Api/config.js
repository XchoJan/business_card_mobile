import axios from 'axios';
import { appConfig, deviceName } from '../core/constants/app-config';

import {TokensRepository} from '../helpers/tokens-repository';

export const API_URL = 'http://api.test.fuelsolutions.group/api/v1/'; // PROD

const DeviceName = deviceName

export const api = axios.create({
    timeout: 5000,
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    async params => {
        if (params._retry) {
            // console.log('SECOND REQUEST', params.headers.Authorization);
            return params;
        }

        const url = String(params?.url || '');
        const isPublicAuthEndpoint =
          url.includes('login') ||
          url.includes('register') ||
          url.includes('otp/');

        const accessToken = TokensRepository.getAccessToken();
        if (accessToken && !isPublicAuthEndpoint) {
          params.headers.Authorization = 'Bearer ' + accessToken;
        } else {
          // на всякий случай, чтобы не отправлять случайный Authorization на публичные эндпоинты
          delete params.headers.Authorization;
        }
        params.headers['device-id'] = await appConfig.deviceId;
        params.headers['device-name'] = DeviceName;
        console.log(params.method.toUpperCase(), params.url);

        return params;
    },
    error => Promise.reject(error),
);

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        // Проверяем наличие response перед обращением к status
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        originalRequest.headers.Authorization = 'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // const oldRefreshToken = await AsyncStorageServices.getRefreshToken();
            return new Promise(async (resolve, reject) => {
                try {
                    const {data} = await axios.post(API_URL + 'auth/refresh');
                    // const {accessToken} = data;

                    // TokensRepository.setAccessToken(accessToken);

                    // api.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    // originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                    // processQueue(null, accessToken);
                    resolve(api(originalRequest));
                } catch (e) {
                    processQueue(e, null);
                    reject(e);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    },
);
