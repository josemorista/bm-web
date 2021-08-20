export interface ISegmentedExam {
	examId: string;
	algorithm: "randomForest" | "SVM";
	threshold: number;
	affectedArea: number;
	classifiedArea: number;
	createdAt: Date | string;
	updatedAt: Date | string;
}