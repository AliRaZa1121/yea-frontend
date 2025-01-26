import { ApiEndPoint } from "../utilities/constant/apiEndpoints";
import { httpService } from "../utilities/helper/axiosHelper";
import { AuthForgetPassword, AuthLogin, AuthRegister, AuthResendLink, AuthResetPassword } from "../utilities/interface/auth.interface";


async function login(payload: AuthLogin) {
    const response = await httpService.post(ApiEndPoint.AUTH.LOGIN, payload);
    return response;
}

async function register(payload: AuthRegister) {
    const response = await httpService.post(ApiEndPoint.AUTH.REGISTER, payload);
    return response;
}

async function forgetPassword(payload: AuthForgetPassword) {
    const response = await httpService.post(ApiEndPoint.AUTH.FORGOT_PASSWORD, payload);
    return response;
}

async function resetPassword(payload: AuthResetPassword) {
    const response = await httpService.post(ApiEndPoint.AUTH.RESET_PASSWORD, payload);
    return response;
}

async function resendLink(payload: AuthResendLink) {
    const response = await httpService.post(ApiEndPoint.AUTH.RESEND_LINK, payload);
    return response;
}


async function refreshToken(payload: any) {
    const response = await httpService.post(ApiEndPoint.AUTH.REFRESH_TOKEN, payload);
    return response;
}

export const AuthService = {
    login,
    register,
    forgetPassword,
    resetPassword,
    refreshToken,
    resendLink
}

