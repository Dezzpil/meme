import axios from "axios";

axios.defaults.baseURL = "http://localhost:3300";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Установка настройки по умолчанию при создании экземпляра
export const api = axios.create();
