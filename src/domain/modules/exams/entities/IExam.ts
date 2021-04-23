import { IPatient } from '../../patients/entities/IPatient';
import { IExamDetection } from './IExamDetection';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';

	patientId: string;
	pixelArea: number;

	patient?: IPatient;

	dicomFileLocation: string;

	examDetections?: Array<IExamDetection>;
	createdAt: Date;
	updatedAt: Date;
}