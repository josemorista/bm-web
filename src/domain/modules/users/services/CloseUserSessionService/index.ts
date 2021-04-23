import { CACHE_KEYS } from '../../../../consts';
import { ICacheProvider } from '../../../../shared/providers/CacheProvider/models/ICacheProvider';

export class CloseUserSessionService {
	constructor(
		private cacheProvider: ICacheProvider
	) { }

	async execute(): Promise<void> {
		await this.cacheProvider.invalidate(CACHE_KEYS.USER_TOKEN);
	}
}