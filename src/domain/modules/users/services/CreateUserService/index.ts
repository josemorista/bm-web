import { API_ROUTES } from "../../../../consts";
import { FormValidationError } from "../../../../shared/errors/FormValidationError";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";

import { IUser } from "../../entities/IUser";

type ICreateUserServiceDTO = Pick<IUser, "email" | "firstName" | "lastName" | "job" | "password" | "relatedInstitution">;

export class CreateUserService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider
	) { }

	async execute(data: ICreateUserServiceDTO): Promise<void> {

		const { email, password } = data;

		if (!this.formValidationProvider.isEmail(email)) {
			throw new FormValidationError("Invalid email", "email");
		}

		if (!this.formValidationProvider.isSafePassword(password)) {
			throw new FormValidationError("Password is not strong enough", "password");
		}

		const requiredFields: Array<keyof ICreateUserServiceDTO> = [
			"firstName",
			"lastName",
			"job",
			"relatedInstitution"
		];

		for (const field of requiredFields) {
			if (!this.formValidationProvider.hasLength(data[field] || "", 1)) {
				throw new FormValidationError("Missing required field", field);
			}
		}

		await this.httpClientProvider.post({
			url: API_ROUTES.USERS,
			body: data
		});
	}
}