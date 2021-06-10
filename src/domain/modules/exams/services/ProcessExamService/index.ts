import { API_ROUTES } from '../../../../consts';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { ISegmentedExam } from '../../entities/ISegmentedExam';

interface IProcessExamServiceDTO {
	examId: string;
	threshold: number;
	authorizeToken: string;
}

export class ProcessExamService {

	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ examId, threshold, authorizeToken }: IProcessExamServiceDTO): Promise<ISegmentedExam> {
		const { data } = await this.httpClientProvider.post<ISegmentedExam>({
			url: `${API_ROUTES.EXAMS}/${examId}/segmentation`,
			body: {
				algorithm: 'randomForest',
				params: {
					threshold
				}
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
		return data;
	}
}