import { CACHE_KEYS } from '../../../../consts';
import { ICacheProvider } from '../../../../shared/providers/CacheProvider/models/ICacheProvider';

import { IUser } from '../../entities/IUser';

export class GetUserFromSessionService {
	constructor(
		private cacheProvider: ICacheProvider
	) { }

	async execute(): Promise<IUser | null> {

		const user = await this.cacheProvider.get<IUser>(CACHE_KEYS.USER);

		return user || null;

	}
}