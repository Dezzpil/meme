import axios from "axios";

const BackAPIPort = import.meta.env.VITE_BACK_API_PORT || "3000";

axios.defaults.baseURL = `http://localhost:${BackAPIPort}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

// Установка настройки по умолчанию при создании экземпляра
export const api = axios.create();
