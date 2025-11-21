
const BE_SERVER = import.meta.env.VITE_BE_SERVER;
export const API_URLS = {
    GOOGLE_AUTH: `${BE_SERVER}/api/v1/google`,
    LOGIN: `${BE_SERVER}/api/v1/auth/login`,
}