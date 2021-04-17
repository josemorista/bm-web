import { CookiesCacheProvider } from '../../../../shared/providers/CacheProvider/implementations/CookiesCacheProvider';
import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { CreateUserSessionService } from '../../services/CreateUserSessionService';

export class CreateUserSessionServiceFactory {
	static create(): CreateUserSessionService {
		const httpClientProvider = new AxiosHttpClientProvider();
		const formValidationProvider = new RegexFormValidationProvider();
		const cacheProvider = new CookiesCacheProvider();
		return (new CreateUserSessionService(httpClientProvider, formValidationProvider, cacheProvider));
	}
}