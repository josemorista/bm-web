export interface IHttpRequest {
	url: string;
	body?: unknown;
	params?: Record<string, boolean | number | string>;
	headers?: Record<string, boolean | number | string>;
}