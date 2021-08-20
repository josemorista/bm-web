import axios from "axios";
import { httpClientConfig } from "../../../../config/httpClient";
import { AppError } from "../../../errors/AppError";
import { IHttpResponseDTO, IDeleteMethodDTO, IGetMethodDTO, IHttpClientProvider, IPatchMethodDTO, IPostMethodDTO, IPutMethodDTO } from "../models/IHttpClientProvider";

const api = axios.create({
	timeout: httpClientConfig.timeout
});

class AxiosHttpClientProvider implements IHttpClientProvider {

	async post<Response>({ url, body, params, headers }: IPostMethodDTO): Promise<IHttpResponseDTO<Response>> {
		try {
			const { data, status } = await api.post(url, body || {}, {
				headers: {
					...headers
				},
				params
			});
			return { data: data as Response, status };
		} catch (error) {
			if (error.response) {
				throw new AppError(error.response.data.error, error.response.status);
			}
			throw error;
		}
	}

	async get<Response>({ url, params, headers }: IGetMethodDTO): Promise<IHttpResponseDTO<Response>> {
		try {
			const { data, status } = await api.get(url, {
				params,
				headers: {
					...headers
				}
			});
			return { data: data as Response, status };
		} catch (error) {
			if (error.response) {
				throw new AppError(error.response.data.error, error.response.status);
			}
			throw error;
		}
	}

	async patch<Response>({ url, params, headers, body }: IPatchMethodDTO): Promise<IHttpResponseDTO<Response>> {
		try {
			const { data, status } = await api.patch(url, body || {}, {
				headers: {
					...headers
				},
				params
			});
			return { data: data as Response, status };
		} catch (error) {
			if (error.response) {
				throw new AppError(error.response.data.error, error.response.status);
			}
			throw error;
		}
	}

	async put<Response>({ url, params, headers, body }: IPutMethodDTO): Promise<IHttpResponseDTO<Response>> {
		try {
			const { data, status } = await api.put(url, body || {}, {
				headers: {
					...headers
				},
				params
			});
			return { data: data as Response, status };
		} catch (error) {
			if (error.response) {
				throw new AppError(error.response.data.error, error.response.status);
			}
			throw error;
		}
	}

	async delete<Response>({ url, params, headers }: IDeleteMethodDTO): Promise<IHttpResponseDTO<Response>> {
		try {
			const { data, status } = await api.delete(url, {
				headers: {
					...headers
				},
				params
			});
			return { data: data as Response, status };
		} catch (error) {
			if (error.response) {
				throw new AppError(error.response.data.error, error.response.status);
			}
			throw error;
		}
	}
}

export { AxiosHttpClientProvider };