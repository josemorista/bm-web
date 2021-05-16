import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

interface IDeletePatientServiceDTO {
	patientId: string;
	authorizeToken: string;
}

export class DeletePatientService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider
	) { }

	async execute({ patientId, authorizeToken }: IDeletePatientServiceDTO): Promise<void> {

		if (!this.formValidationProvider.hasLength(patientId, 36)) {
			throw new FormValidationError('Invalid patient id', 'patientId');
		}

		await this.httpClientProvider.delete({
			url: `${API_ROUTES.PATIENTS}/${patientId}`,
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});

	}
}