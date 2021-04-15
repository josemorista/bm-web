import { IHttpHeader } from './IHttpHeader';

export interface IHttpRequest {
	url: string;
	body?: unknown;
	params?: Record<string, boolean | number | string>;
	headers?: IHttpHeader;
}