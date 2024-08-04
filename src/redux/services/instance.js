import axios from "axios";

const URL = "https://final-team-pr-backend.onrender.com";

// Настройки заголовков по умолчанию
const headerConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

// Экземпляр axios для публичных запросов (без авторизации)
export const publicInstance = axios.create({
  ...headerConfig,
  baseURL: URL,
});

// Экземпляр axios для авторизованных запросов
export const instance = axios.create({ ...headerConfig, baseURL: URL });

// Интерсептор для добавления токена авторизации в заголовки запросов
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор для обработки ответов, включая обработку ошибок авторизации (401)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Попытка обновления токена
        const { data } = await axios.get(`${URL}/auth/refresh`, headerConfig);
        localStorage.setItem("token", data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/signin"; // Перенаправление на страницу входа при неудаче
      }
    }
    return Promise.reject(error);
  }
);
