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

	originalImageUrl?: string | null;
	resultImageUrl?: string | null;
	edgedResultImageUrl?: string | null;
	overlayImageUrl?: string | null;

	createdAt: Date | string;
	updatedAt: Date | string;
}