export interface IPatient {
	id: string;
	name: string;
	dicomPatientId: string | null;

	birthDate: Date | string | null;
	sex: 'M' | 'F';

	description: string;

	ownerId: string;

	createdAt: Date | string;
	updatedAt: Date | string;
}