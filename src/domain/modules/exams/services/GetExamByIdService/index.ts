import { API_ROUTES } from "../../../../consts";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IExam } from "../../entities/IExam";

interface IGetExamServiceDTO {
	examId: string;
	authorizeToken: string;
}

export class GetExamByIdService {
	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ authorizeToken, examId }: IGetExamServiceDTO): Promise<IExam | null> {
		try {

			const { data } = await this.httpClientProvider.get<IExam>({
				url: `${API_ROUTES.EXAMS}/${examId}`,
				headers: {
					Authorization: `Bearer ${authorizeToken}`
				}
			});
			return data;
		} catch (error) {
			return null;
		}
	}
}