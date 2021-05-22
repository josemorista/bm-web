import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { IPatient } from '../../entities/IPatient';

interface ICreatePatientServiceDTO extends Pick<IPatient, 'name' | 'birthDate' | 'description' | 'gender'> {
	authorizeToken: string;
}

export class CreatePatientService {

	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider) { }

	async execute({ authorizeToken, name, birthDate, ...rest }: ICreatePatientServiceDTO): Promise<void> {
		if (!this.formValidationProvider.hasLength(name, 1)) {
			throw new FormValidationError('Field name is required', 'name');
		}
		let formattedDate = birthDate;
		if (typeof formattedDate == 'string') {
			formattedDate = formattedDate.replace(/\//g, '-');
			if (!this.formValidationProvider.isValidDate(formattedDate)) {
				throw new FormValidationError('Invalid date format', 'birthDate');
			}
			const matches = /(?<month>\d+)-(?<day>\d+)-(?<year>\d+)/.exec(formattedDate);

			if (matches) {
				const { groups } = matches;
				groups && (formattedDate = new Date(Number(groups.year), (Number(groups.month) - 1), Number(groups.day)));
			}
		}

		if (formattedDate instanceof Date && Date.now() < formattedDate.getTime()) {
			throw new FormValidationError('Invalid date', 'birthDate');
		}

		await this.httpClientProvider.post({
			url: API_ROUTES.PATIENTS,
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