import { API_ROUTES } from '../../../../consts';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

interface IProcessExamServiceDTO {
	examId: string;
	threshold: number;
	authorizeToken: string;
}

export class ProcessExamService {

	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ examId, threshold, authorizeToken }: IProcessExamServiceDTO): Promise<void> {
		await this.httpClientProvider.post({
			url: `${API_ROUTES.EXAMS}/${examId}/segmentation`,
			body: {
				algorithm: 'randomForest',
				randomForestParams: {
					threshold
				}
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
	}
}