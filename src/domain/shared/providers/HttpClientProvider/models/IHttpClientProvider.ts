import { IHttpRequest } from './IHttpRequest';

export type IPostMethodDTO = IHttpRequest;
export type IGetMethodDTO = Omit<IHttpRequest, 'body'>;
export type IPutMethodDTO = IHttpRequest;
export type IDeleteMethodDTO = Omit<IHttpRequest, 'body'>;
export type IPatchMethodDTO = IHttpRequest;

export interface IHttpResponseDTO<Response> {
	data: Response;
	status: number
}
export interface IHttpClientProvider {
	post<Response>(data: IPostMethodDTO): Promise<IHttpResponseDTO<Response>>;
	get<Response>(data: IGetMethodDTO): Promise<IHttpResponseDTO<Response>>;
	put<Response>(data: IPutMethodDTO): Promise<IHttpResponseDTO<Response>>;
	delete<Response>(data: IDeleteMethodDTO): Promise<IHttpResponseDTO<Response>>;
	patch<Response>(data: IPatchMethodDTO): Promise<IHttpResponseDTO<Response>>;
}