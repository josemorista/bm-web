import { API_ROUTES, CACHE_KEYS } from "../../../../consts";
import { ICacheProvider } from "../../../../shared/providers/CacheProvider/models/ICacheProvider";

import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IUserCredentials } from "../../entities/IUserCredentials";

export class GetUserSessionService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private cacheProvider: ICacheProvider
	) { }

	async execute(): Promise<IUserCredentials | null> {

		const credentials = await this.cacheProvider.get<IUserCredentials>(CACHE_KEYS.USER_TOKEN);

		if (!credentials) return null;

		const { data: { isValid } } = await this.httpClientProvider.post<{ isValid: boolean }>({
			url: `${API_ROUTES.SESSIONS}/verify-token`,
			body: {
				token: credentials.token
			}
		});

		if (!isValid) {
			await this.cacheProvider.invalidate(CACHE_KEYS.USER_TOKEN);
			return null;
		}

		return credentials;

	}
}