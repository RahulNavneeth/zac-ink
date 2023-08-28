const PRODUCTION = import.meta.env.PRODUCTION === 'true';
export const BASE_URL = PRODUCTION ? 'https://api.example.com' : 'http://localhost:5174';
