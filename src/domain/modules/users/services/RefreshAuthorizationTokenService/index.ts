import { CACHE_KEYS } from "../../../../consts";
import { AppError } from "../../../../shared/errors/AppError";
import { ICacheProvider } from "../../../../shared/providers/CacheProvider/models/ICacheProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";

export class RefreshAuthorizationTokenService {
	constructor(
		private cacheProvider: ICacheProvider,
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute() {
		const credentials = await this.cacheProvider.get(CACHE_KEYS.USER_TOKEN);
		if (!credentials) {
			throw new AppError("Unable to refresh token");
		}

	}
}