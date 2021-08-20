export interface IPatient {
	id: string;
	name: string;
	dicomPatientId: string | null;

	birthDate: Date | string | null;
	gender: "M" | "F";

	description: string;

	ownerId: string;

	createdAt: Date | string;
	updatedAt: Date | string;
}