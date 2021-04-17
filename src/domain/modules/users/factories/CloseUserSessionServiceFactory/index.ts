import { CookiesCacheProvider } from '../../../../shared/providers/CacheProvider/implementations/CookiesCacheProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { CloseUserSessionService } from '../../services/CloseUserSessionService';

export class CloseUserSessionServiceFactory {
	static create(): CloseUserSessionService {
		const cacheProvider = new CookiesCacheProvider();
		const httpClientProvider = new AxiosHttpClientProvider();
		return (new CloseUserSessionService(cacheProvider, httpClientProvider));
	}
}