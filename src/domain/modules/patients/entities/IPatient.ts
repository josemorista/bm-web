export interface IPatient {
	id: string;
	name: string;
	dicomPatientId: string | null;

	birthDate: Date | string | null;
	sex: 'M' | 'F';

	previousBoneLesions: boolean | null;
	previousQt: boolean | null;
	previousRt: boolean | null;
	previousCancerDiagnosis: boolean | null;
	description: string;

	ownerId: string;
	createdAt: Date | string;
	updatedAt: Date | string;
}