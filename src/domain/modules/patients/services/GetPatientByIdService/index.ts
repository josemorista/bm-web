import { API_ROUTES } from "../../../../consts";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IPatient } from "../../entities/IPatient";

interface IGetPatientByIdServiceDTO {
	id: string;
	authorizeToken: string;
}

export class GetPatientByIdService {

	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ authorizeToken, id }: IGetPatientByIdServiceDTO): Promise<IPatient | null> {
		try {
			const { data } = await this.httpClientProvider.get<IPatient>({
				url: `${API_ROUTES.PATIENTS}/${id}`,
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