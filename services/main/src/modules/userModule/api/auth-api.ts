import axios, { AxiosInstance, AxiosResponse } from "axios";
import { UserType } from "../types/types";

interface ErrorResponse {
    message: string
    statusCode: 400
}

interface LoginRequest {
    email: string
    password: string
}

interface LoginRespnonse {
    statusCode: number
    data: UserType
    message: string
}

export interface AuthResponse {
    id: string;
    userName: string;
    email: string;
}

interface RegisterRequest {
    email: string
    password: string
    repeatPassword: string
    userName: string
}

interface RegisterRespnonse {

}


interface AuthRequest {
    email: string
    password: string
}

interface AuthRespnonse {

}


class AuthApi {
    public axiosApi: AxiosInstance
    constructor() {
        this.axiosApi = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true })
    }

    async login(data: LoginRequest): Promise<LoginRespnonse> {
        try {
            const dto = {
                email: data.email,
                password: data.password
            }
            const res = await this.axiosApi.post('/auth/login', dto)
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    async auth(): Promise<AuthResponse> {
        try {
            const res = await this.axiosApi.get('/auth')
            return res.data
        } catch (e) {
            console.log(e);
        }
    }
}

export const authApi = new AuthApi()