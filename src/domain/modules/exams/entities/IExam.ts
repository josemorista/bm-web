import { IPatient } from '../../patients/entities/IPatient';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';

	patientId: string;
	patient?: IPatient;

	pixelArea: number;

	dicomFileLocation: string;

	createdAt: Date;
	updatedAt: Date;
}