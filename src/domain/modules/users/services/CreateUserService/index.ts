import { inject, injectable } from 'tsyringe';
import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

import { IUser } from '../../entities/IUser';

type ICreateUserServiceDTO = Pick<IUser, 'email' | 'firstName' | 'lastName' | 'job' | 'password' | 'relatedInstitution'>;

@injectable()
export class CreateUserService {
	constructor(
		@inject('HttpClientProvider')
		private httpClientProvider: IHttpClientProvider,
		@inject('FormValidationProvider')
		private formValidationProvider: IFormValidationProvider
	) { }

	async execute({ email, password, ...rest }: ICreateUserServiceDTO): Promise<void> {

		if (!this.formValidationProvider.isEmail(email)) {
			throw new FormValidationError('Email inválido', 'email');
		}

		if (!this.formValidationProvider.isSafePassword(password)) {
			throw new FormValidationError('Senha muito fraca', 'password');
		}

		const requiredFields: Array<keyof ICreateUserServiceDTO> = [
			'firstName',
			'lastName',
			'job',
			'relatedInstitution'
		];

		for (const field of requiredFields) {
			if (!this.formValidationProvider.hasLength(rest[field], 1)) {
				throw new FormValidationError('Campo requerido', field);
			}
		}

		await this.httpClientProvider.post({
			url: API_ROUTES.USERS,
			body: {
				email,
				password,
				...rest
			}
		});
	}
}