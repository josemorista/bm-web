export interface ICacheProvider {
	set(key: string, data: unknown): Promise<void>;
	get<T>(key: string): Promise<T | undefined>;
	invalidate(key: string): Promise<void>;
}