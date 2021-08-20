import { API_ROUTES } from "../../../../consts";

import { IHttpClientProvider } from "../../../../shared/providers/HttpClientProvider/models/IHttpClientProvider";
import { IUser } from "../../entities/IUser";

interface IGetUserServiceDTO {
	userId: string;
	authorizeToken: string;
}

export class GetUserService {
	constructor(
		private httpClientProvider: IHttpClientProvider
	) { }

	async execute({ userId, authorizeToken }: IGetUserServiceDTO): Promise<IUser | null> {
		try {
			const { data: user } = await this.httpClientProvider.get<IUser | undefined>({
				url: `${API_ROUTES.USERS}/${userId}`,
				headers: {
					Authorization: `Bearer ${authorizeToken}`
				}
			});
			return user || null;
		} catch (error) {
			return null;
		}
	}
}