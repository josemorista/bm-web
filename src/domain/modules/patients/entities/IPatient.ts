export interface IPatient {
	id: string;
	name: string;
	dicomPatientId: string | null;

	birthDate: Date | null;
	sex: 'M' | 'F';

	previousBoneLesions: boolean | null;
	previousQt: boolean | null;
	previousRt: boolean | null;
	previousCancerDiagnosis: boolean | null;
	previousCancerDiagnosisType?: string;
	observations: string;

	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}