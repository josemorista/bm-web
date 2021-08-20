import { CACHE_CONFIG } from "../../../../config/cache";
import { ICacheProvider } from "../models/ICacheProvider";

export class LocalStorageCacheProvider implements ICacheProvider {
	private prefix: string;
	constructor() {
		this.prefix = CACHE_CONFIG.prefix;
	}

	async set(key: string, data: unknown): Promise<void> {
		localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
	}

	async get<T>(key: string): Promise<T | undefined> {
		const item = localStorage.getItem(`${this.prefix}${key}`);
		return item ? JSON.parse(item) : undefined;
	}

	async invalidate(key: string): Promise<void> {
		localStorage.removeItem(`${this.prefix}${key}`);
	}

}