import { API_ROUTES } from "../../../../consts";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IPatient } from "../../entities/IPatient";

interface IGetPatientsByUserServiceDTO {
	authorizeToken: string;
}

export class GetPatientsByUserService {

	constructor(private httpClientProvider: IHttpClientProvider) { }

	async execute({ authorizeToken }: IGetPatientsByUserServiceDTO): Promise<Array<IPatient>> {
		const { data } = await this.httpClientProvider.get<Array<IPatient>>({
			url: API_ROUTES.PATIENTS,
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
		return data;
	}
}