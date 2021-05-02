import { API_ROUTES } from '../../../../consts';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { IExam } from '../../entities/IExam';

interface IGetExamsFromPatientServiceDTO {
	patientId: string;
	authorizeToken: string;
}

export class GetExamsFromPatientService {
	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ authorizeToken, patientId }: IGetExamsFromPatientServiceDTO): Promise<Array<IExam>> {
		const { data } = await this.httpClientProvider.get<Array<IExam>>({
			url: API_ROUTES.EXAMS,
			params: {
				patientId
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
		return data;
	}
}