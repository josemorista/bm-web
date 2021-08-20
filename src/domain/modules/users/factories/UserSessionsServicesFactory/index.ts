import { LocalStorageCacheProvider } from "../../../../shared/providers/CacheProvider/implementations/LocalStorageCacheProvider";
import { ICacheProvider } from "../../../../shared/providers/CacheProvider/models/ICacheProvider";
import { RegexFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider";
import { AxiosHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { CloseUserSessionService } from "../../services/CloseUserSessionService";
import { CreateUserSessionService } from "../../services/CreateUserSessionService";
import { GetUserSessionService } from "../../services/GetUserSessionService";

class UserSessionsServicesFactory {

	static httpClientProvider: IHttpClientProvider;
	static cacheProvider: ICacheProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
		this.cacheProvider = new LocalStorageCacheProvider();
	}

	static createGetUserSessionService(): GetUserSessionService {
		return (new GetUserSessionService(this.httpClientProvider, this.cacheProvider));
	}

	static createCreateUserSessionService(): CreateUserSessionService {
		const formValidationProvider = new RegexFormValidationProvider();
		return (new CreateUserSessionService(this.httpClientProvider, formValidationProvider, this.cacheProvider));
	}

	static createCloseUserSessionService(): CloseUserSessionService {
		return (new CloseUserSessionService(this.cacheProvider));
	}
}

UserSessionsServicesFactory.initialize();

export { UserSessionsServicesFactory };