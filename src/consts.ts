export const ROUTES = {
	HOME: '/',
	REGISTER: '/register',
	MY_PATIENTS: '/patients',
	PATIENT: (patientId: string): string => `/patients/${patientId}`
};