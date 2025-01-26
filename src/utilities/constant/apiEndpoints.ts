export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ApiEndPoint = {
    AUTH: {
        LOGIN: "auth/login",
        REGISTER: "auth/signup",
        FORGOT_PASSWORD: "auth/forget-password",
        RESET_PASSWORD: "auth/reset-password",
        RESEND_LINK: "auth/resend-link",
        REFRESH_TOKEN: "auth/refresh-token",
    },
    DASHBOARD: {
        WELCOME_MESSAGE: "welcome",
    },
}
