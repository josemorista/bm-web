import { API_ROUTES, CACHE_KEYS } from '../../../../consts';
import { ICacheProvider } from '../../../../shared/providers/CacheProvider/models/ICacheProvider';

import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

import { IUser } from '../../entities/IUser';
import { IUserCredentials } from '../../entities/IUserCredentials';

export class GetUserFromSessionService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private cacheProvider: ICacheProvider
	) { }

	async execute(): Promise<IUser | null> {

		const credentials = await this.cacheProvider.get<IUserCredentials>(CACHE_KEYS.USER_TOKEN);

		if (!credentials) return null;

		const { data: { isValid } } = await this.httpClientProvider.get<{ isValid: boolean }>({
			url: `${API_ROUTES.SESSIONS}/verify-token`,
			params: {
				token: credentials.token
			}
		});

		if (!isValid) {
			return null;
		}

		this.httpClientProvider.addDefaultHeader('Authorization', `Bearer ${credentials.token}`);

		try {
			const { data: user } = await this.httpClientProvider.get<IUser>({
				url: `${API_ROUTES.USERS}/${credentials.userId}`
			});
			return user;
		} catch (error) {
			return null;
		}

	}
}