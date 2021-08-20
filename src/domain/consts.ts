export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
	USERS: `${API_URL}/users`,
	SESSIONS: `${API_URL}/users/sessions`,
	PATIENTS: `${API_URL}/patients`,
	EXAMS: `${API_URL}/exams`,
};

export const CACHE_KEYS = {
	USER_TOKEN: "token"
};