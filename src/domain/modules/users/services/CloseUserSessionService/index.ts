import { CACHE_KEYS } from '../../../../consts';
import { ICacheProvider } from '../../../../shared/providers/CacheProvider/models/ICacheProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';

export class CloseUserSessionService {
	constructor(
		private cacheProvider: ICacheProvider,
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute(): Promise<void> {
		this.httpClientProvider.removeDefaultHeader('Authorization');
		await this.cacheProvider.invalidate(CACHE_KEYS.USER_TOKEN);
	}
}