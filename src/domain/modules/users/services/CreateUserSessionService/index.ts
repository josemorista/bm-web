import { API_ROUTES } from '../../../../consts';
import { FormValidationError } from '../../../../shared/errors/FormValidationError';
import { ICacheProvider } from '../../../../shared/providers/CacheProvider/models/ICacheProvider';
import { IFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

import { IUser } from '../../entities/IUser';

type ICreateUserSessionServiceDTO = Pick<IUser, 'email' | 'password'>;

export class CreateUserSessionService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider,
		private cacheProvider: ICacheProvider
	) { }

	async execute({ email, password }: ICreateUserSessionServiceDTO): Promise<IUser> {

		if (!this.formValidationProvider.isEmail(email)) {
			throw new FormValidationError('Email inválido', 'email');
		}

		if (!this.formValidationProvider.isSafePassword(password)) {
			throw new FormValidationError('Senha inválida', 'password');
		}

		const { data: { user, token } } = await this.httpClientProvider.post<{ user: IUser; token: string }>({
			url: API_ROUTES.SESSIONS,
			body: {
				email,
				password
			}
		});

		await this.cacheProvider.set('user', { user, token });

		return user;

	}
}