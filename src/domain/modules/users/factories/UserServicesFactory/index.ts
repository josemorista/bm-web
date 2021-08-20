import { RegexFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/implementations/RegexFormValidationProvider";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { AxiosHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/implementations/AxiosHttpClientProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { CreateUserService } from "../../services/CreateUserService";
import { ForgotPasswordService } from "../../services/ForgotPasswordService";
import { GetUserService } from "../../services/GetUserService";

class UserServicesFactory {

	private static formValidationProvider: IFormValidationProvider;
	private static httpClientProvider: IHttpClientProvider;

	static initialize(): void {
		this.httpClientProvider = new AxiosHttpClientProvider();
		this.formValidationProvider = new RegexFormValidationProvider();
	}

	static createCreateUserService(): CreateUserService {
		return (new CreateUserService(this.httpClientProvider, this.formValidationProvider));
	}

	static createGetUserService(): GetUserService {
		return (new GetUserService(this.httpClientProvider));
	}

	static createForgotPasswordService(): ForgotPasswordService {
		return new ForgotPasswordService(this.httpClientProvider, this.formValidationProvider);
	}
}

UserServicesFactory.initialize();

export { UserServicesFactory };