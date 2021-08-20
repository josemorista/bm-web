export const ROUTES = {
	HOME: "/",
	REGISTER: "/register",
	MY_PATIENTS: "/patients",
	FORGOT_PASSWORD: "/forgot-password",
	PATIENT: (patientId: string): string => `/patients/${patientId}`,
	EXAMS: (examId: string): string => `/patients/exams/${examId}`,
};