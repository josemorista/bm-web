import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { IPatient } from '../../entities/IPatient';

interface IUpdatePatientServiceDTO extends Pick<IPatient, 'name' | 'birthDate' | 'description' | 'sex' | 'id'> {
	authorizeToken: string;
}

export class UpdatePatientService {

	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider) { }

	async execute({ authorizeToken, name, birthDate, id, ...rest }: IUpdatePatientServiceDTO): Promise<void> {
		if (!this.formValidationProvider.hasLength(name, 1)) {
			throw new FormValidationError('Field name is required', 'name');
		}
		let formattedDate = birthDate;
		if (typeof formattedDate == 'string') {
			formattedDate = formattedDate.replaceAll('/', '-');
			if (!this.formValidationProvider.isValidDate(formattedDate)) {
				throw new FormValidationError('Invalid date format', 'birthDate');
			}
			formattedDate = new Date(formattedDate);
		}
		if (formattedDate instanceof Date && Date.now() < formattedDate.getTime()) {
			throw new FormValidationError('Invalid date', 'birthDate');
		}
		await this.httpClientProvider.put({
			url: `${API_ROUTES.PATIENTS}/${id}`,
			body: {
				name,
				birthDate: formattedDate,
				...rest
			},
			headers: {
				Authorization: `Bearer ${authorizeToken}`
			}
		});
	}
}