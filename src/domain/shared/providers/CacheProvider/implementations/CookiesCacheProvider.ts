import { ICacheProvider } from "../models/ICacheProvider";
import Cookie from "js-cookie";
import { CACHE_CONFIG } from "../../../../config/cache";

export class CookiesCacheProvider implements ICacheProvider {

	private prefix: string;

	constructor() {
		this.prefix = CACHE_CONFIG.prefix;
	}

	async set(key: string, data: unknown): Promise<void> {
		Cookie.set(`${this.prefix}${key}`, JSON.stringify(data));
	}

	async get<T>(key: string): Promise<T | undefined> {
		const data = Cookie.get(`${this.prefix}${key}`);
		if (!data) return undefined;
		return JSON.parse(data) as T;
	}

	async invalidate(key: string): Promise<void> {
		Cookie.remove(`${this.prefix}${key}`);
	}

}