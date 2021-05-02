import { IPatient } from '../../patients/entities/IPatient';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';

	date: Date | string;

	patientId: string;
	patient?: IPatient;

	pixelArea: number | null;

	dicomFileLocation: string;

	originalImageLocation: string | null;
	resultImageLocation: string | null;
	edgedResultImageLocation: string | null;
	overlayImageLocation: string | null;

	createdAt: Date | string;
	updatedAt: Date | string;
}