import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api";

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: number;
}

export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: User;
}

export const AuthAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const res = await axios.post<LoginResponse>(`${BASE_URL}/login/`, {
        email,
        password,
      });
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Error al iniciar sesión");
    }
  },
};
