export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthRegister {
    name: string;
    email: string;
    password: string;
}

export interface AuthForgetPassword {
    email: string;
}

export interface AuthResetPassword {
    password: string;
    token: string;
}

export interface AuthResendLink {
    email: string;
}

