import { message } from "antd";
import axios, { AxiosError } from "axios";
import { AuthService } from "../../services/auth.service";
import { BASE_URL } from "../constant/apiEndpoints";
import { RoutePaths } from "../constant/appRoutes";
import { LOCAL_STORAGE_KEYS } from "../constant/localStorageKeys";
import { ApiErrorResponse } from "../interface/apiResponse.interface";
import { getFromLocal } from "./localStorageHelper";


const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, DELETE",
    "Content-Type": "application/json",
    Authorization: BASE_URL,
};


let bearerToken: string;

function resetHeaders({ agent }: any) {
    agent.defaults.headers = headers;
}

const publicAgent = axios.create({
    baseURL: BASE_URL,
    headers: headers,
});


if (getFromLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN, { isJson: true, isEncrypted: true })) {
    const { accessToken } = getFromLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN, { isJson: true, isEncrypted: true }) || {};
    bearerToken = accessToken;
}

const httpService = axios.create({
    baseURL: BASE_URL,
    headers: {
        ...headers,
    },
});

httpService.interceptors.request.use((config) => {
    const token = getFromLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN, { isJson: true, isEncrypted: true });
    if (token) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
    }
    return config;
});

httpService.interceptors.response.use(undefined, async (error: AxiosError<ApiErrorResponse>) => {

    if (error?.response?.status === 401) {
        const { refreshToken } = getFromLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN, { isJson: true, isEncrypted: true }) || {};

        const { data } = await AuthService.refreshToken({ refreshToken });

        console.log(data, "refresh token response");

        if (data) {
            const authToken = {
                accessToken: data?.data?.accessToken,
                refreshToken: data?.data?.refreshToken,
            };
            console.log(authToken);

            localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(authToken));

            window.location.reload();
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
            message.error("401 Unauthorized. Please log in again.");
            setTimeout(() => {
                window.location.href = RoutePaths.Auth.LOGIN;
            }, 2000);
        }
    } else if (error?.response?.status === 400) {
        const errorMessages = error.response?.data?.message?.map((msg) => msg) || ["Bad Request"];

        errorMessages.forEach(element => {
            message.error(element);
        });
    } else if (error?.response?.status === 500) {
        message.error("Internal Server Error");
    }
    else {
        message.error("Something went wrong. Please try again later.");
    }
    return false;
});

const CancelToken = axios.CancelToken;


export { CancelToken, headers, httpService, publicAgent, resetHeaders };

