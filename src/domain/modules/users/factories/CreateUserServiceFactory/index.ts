import { RegexFormValidationProvider } from '../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider';
import { AxiosHttpClientProvider } from '../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider';
import { CreateUserService } from '../../services/CreateUserService';

export class CreateUserServiceFactory {
	static create(): CreateUserService {
		const httpClientProvider = new AxiosHttpClientProvider();
		const formValidationProvider = new RegexFormValidationProvider();
		return (new CreateUserService(httpClientProvider, formValidationProvider));
	}
}