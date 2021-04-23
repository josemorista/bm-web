import { IExam } from './IExam';

export interface IExamDetection {
	id: string;
	examId: string;

	automaticClassificationId: string | null;
	revisedClassificationId: string | null;

	area: number;
	aspectRatio: number;
	perimeter: number;
	centroidX: number;
	centroidY: number;
	equivalentDiameter: number;
	extent: number;
	maxIntensity: number;
	meanIntensity: number;
	minIntensity: number;
	orientation: number;
	eccentricity: number;

	bboxX0: number;
	bboxX1: number;
	bboxY0: number;
	bboxY1: number;

	exam?: IExam;

	createdAt: Date;
	updatedAt: Date;
}