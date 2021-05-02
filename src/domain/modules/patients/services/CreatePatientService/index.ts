import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { IPatient } from '../../entities/IPatient';

interface ICreatePatientServiceDTO extends Pick<IPatient, 'name' | 'birthDate' | 'description' | 'sex'> {
	authorizeToken: string;
}

export class CreatePatientService {

	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider) { }

	async execute({ authorizeToken, name, ...rest }: ICreatePatientServiceDTO): Promise<void> {
		if (!this.formValidationProvider.hasLength(name, 1)) {
			throw new FormValidationError('Field name is required', 'name');
		}
		await this.httpClientProvider.post({
			url: API_ROUTES.PATIENTS,
			body: {
				name,
				...rest
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
	}
}