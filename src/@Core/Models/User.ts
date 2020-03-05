export interface UserResponse {
    name: string;
    email: string;
    "user-token": string;
}

export class UserRegisterRequest {
    ___class = "Users";
    password = '';
    email = '';
    name = '';
}

export class UserLoginRequest {
    login = '';
    password = '';
}