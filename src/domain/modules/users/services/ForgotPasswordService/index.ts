import { API_ROUTES } from "../../../../consts";
import { FormValidationError } from "../../../../shared/errors/FormValidationError";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IUser } from "../../entities/IUser";

type IForgotPasswordServiceDTO = Pick<IUser, "email">;

export class ForgotPasswordService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider
	) { }

	async execute({ email }: IForgotPasswordServiceDTO): Promise<void> {
		if (!this.formValidationProvider.isEmail(email)) {
			throw new FormValidationError("Invalid email", "email");
		}
		await this.httpClientProvider.post({
			url: `${API_ROUTES.USERS}/forgot-my-password`,
			body: {
				email
			}
		});
	}
}