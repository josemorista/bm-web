import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { IHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider';
import { CreateUserService } from '../../services/CreateUserService';
import { GetUserService } from '../../services/GetUserService';

class UserServicesFactory {

	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
	}

	static createCreateUserService(): CreateUserService {
		const formValidationProvider = new RegexFormValidationProvider();
		return (new CreateUserService(this.httpClientProvider, formValidationProvider));
	}

	static createGetUserService(): GetUserService {
		return (new GetUserService(this.httpClientProvider));
	}
}

UserServicesFactory.initialize();

export { UserServicesFactory };