import { API_ROUTES, CACHE_KEYS } from "../../../../consts";
import { FormValidationError } from "../../../../shared/errors/FormValidationError";
import { ICacheProvider } from "../../../../shared/providers/CacheProvider/models/ICacheProvider";
import { IFormValidationProvider } from "../../../../shared/providers/FormValidationProvider/models/IFormValidationProvider";
import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";

import { IUser } from "../../entities/IUser";
import { IUserCredentials } from "../../entities/IUserCredentials";

type ICreateUserSessionServiceDTO = Pick<IUser, "email" | "password">;

export class CreateUserSessionService {
	constructor(
		private httpClientProvider: IHttpClientProvider,
		private formValidationProvider: IFormValidationProvider,
		private cacheProvider: ICacheProvider
	) { }

	async execute({ email, password }: ICreateUserSessionServiceDTO): Promise<IUserCredentials> {

		if (!this.formValidationProvider.isEmail(email)) {
			throw new FormValidationError("Invalid email", "email");
		}

		if (!this.formValidationProvider.isSafePassword(password)) {
			throw new FormValidationError("Invalid password", "password");
		}

		const { data: { user, token } } = await this.httpClientProvider.post<{ user: IUser; token: string }>({
			url: API_ROUTES.SESSIONS,
			body: {
				email,
				password
			}
		});

		const credentials = { token, userId: user.id };

		await this.cacheProvider.set(CACHE_KEYS.USER_TOKEN, credentials);

		return credentials;

	}
}