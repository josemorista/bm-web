import { CookiesCacheProvider } from '../../../../shared/providers/CacheProvider/implementations/CookiesCacheProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { GetUserFromSessionService } from '../../services/GetUserFromSessionService';


export class GetUserFromSessionServiceFactory {
	static create(): GetUserFromSessionService {
		const httpClientProvider = new AxiosHttpClientProvider();
		const cacheProvider = new CookiesCacheProvider();
		return (new GetUserFromSessionService(httpClientProvider, cacheProvider));
	}
}